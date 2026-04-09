from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from typing import List, Optional
from app.db.session import get_db
from app.models.problem import Problem
from app.schemas.problem import ProblemListResponse

router = APIRouter()

@router.get("/", response_model=ProblemListResponse)
async def get_problems(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    topic: Optional[str] = None,
    difficulty: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    # Calculate offset
    skip = (page - 1) * size
    
    # Base query
    query = select(Problem)
    
    # Filters
    if topic:
        # topic_tags is JSON (list of strings)
        query = query.where(Problem.topic_tags.contains([topic]))
    if difficulty:
        query = query.where(Problem.difficulty == difficulty)
        
    # Count total
    count_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_query)).scalar()
    
    # Fetch items
    result = await db.execute(query.offset(skip).limit(size))
    items = result.scalars().all()
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "size": size
    }
