from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User
from app.models.problem import Problem
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from app.core import security
import os

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/sync")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, security.SECRET_KEY, algorithms=[security.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    query = select(User).where(User.id == int(user_id))
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user

@router.post("/solve/{problem_id}")
async def solve_problem(
    problem_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Fetch problem to get XP
    query = select(Problem).where(Problem.id == problem_id)
    result = await db.execute(query)
    problem = result.scalar_one_or_none()
    
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")

    # Award XP
    current_user.xp += problem.xp_reward
    
    # Simple Level Up Logic (every 100 XP)
    current_user.current_level = (current_user.xp // 100) + 1
    
    # Streak Logic (Stub: needs timestamp tracking for 24h)
    current_user.current_streak += 1 

    await db.commit()
    await db.refresh(current_user)

    return {
        "message": f"Success! You earned {problem.xp_reward} XP",
        "new_xp": current_user.xp,
        "new_level": current_user.current_level,
        "new_streak": current_user.current_streak
    }
