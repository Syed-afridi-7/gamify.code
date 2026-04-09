from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserSync, UserProfile, Token
from app.core import security

router = APIRouter()

@router.post("/sync", response_model=Token)
async def sync_user(
    user_data: UserSync,
    db: AsyncSession = Depends(get_db)
):
    # Check if user exists by provider_id or email
    query = select(User).where((User.provider_id == user_data.provider_id) | (User.email == user_data.email))
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if not user:
        # Create new user
        user = User(
            name=user_data.name,
            email=user_data.email,
            avatar_url=user_data.image,
            provider=user_data.provider,
            provider_id=user_data.provider_id
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    else:
        # Update existing user info
        user.name = user_data.name
        user.avatar_url = user_data.image
        await db.commit()

    # Create access token
    access_token = security.create_access_token(subject=user.id)
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserProfile)
async def get_me(
    # This will later use the get_current_user dependency
    user_id: int, # Temporary for testing
    db: AsyncSession = Depends(get_db)
):
    query = select(User).where(User.id == user_id)
    result = await db.execute(query)
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
