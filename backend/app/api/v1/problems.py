from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional
from app.db.session import get_db
from app.models.problem import Problem
from app.schemas.problem import ProblemListResponse, Problem as ProblemSchema

router = APIRouter()

@router.get("/", response_model=ProblemListResponse)
async def get_problems(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    topic: Optional[str] = None,
    difficulty: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    skip = (page - 1) * size
    query = select(Problem)
    if topic:
        query = query.where(Problem.topic_tags.contains([topic]))
    if difficulty:
        query = query.where(Problem.difficulty == difficulty)
    count_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_query)).scalar()
    result = await db.execute(query.offset(skip).limit(size))
    items = result.scalars().all()
    return {"items": items, "total": total, "page": page, "size": size}

@router.get("/{problem_id}", response_model=ProblemSchema)
async def get_problem(
    problem_id: int,
    db: AsyncSession = Depends(get_db)
):
    query = select(Problem).where(Problem.id == problem_id)
    result = await db.execute(query)
    problem = result.scalar_one_or_none()
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem
