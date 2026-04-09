from pydantic import BaseModel
from typing import List, Optional

class ProblemBase(BaseModel):
    title: str
    difficulty: str
    topic_tags: List[str]
    xp_reward: int
    source: Optional[str] = None
    external_link: Optional[str] = None

class Problem(ProblemBase):
    id: int
    description: Optional[str] = None

    class Config:
        from_attributes = True

class ProblemListResponse(BaseModel):
    items: List[Problem]
    total: int
    page: int
    size: int
