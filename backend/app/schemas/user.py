from pydantic import BaseModel, EmailStr
from typing import Optional

class UserSync(BaseModel):
    email: EmailStr
    name: str
    image: Optional[str] = None
    provider: str = "google"
    provider_id: str

class UserProfile(BaseModel):
    id: int
    name: str
    email: EmailStr
    avatar_url: Optional[str] = None
    xp: int
    current_level: int
    current_streak: int
    elo_rating: int

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
