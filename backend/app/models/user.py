from sqlalchemy import Column, Integer, String, Float
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    avatar_url = Column(String, nullable=True)
    xp = Column(Integer, default=0)
    current_level = Column(Integer, default=1)
    current_streak = Column(Integer, default=0)
    elo_rating = Column(Integer, default=1200)
