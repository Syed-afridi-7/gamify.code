from sqlalchemy import Column, Integer, String, JSON
from app.db.session import Base

class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    constraints = Column(String, nullable=True)
    difficulty = Column(String) # Easy, Medium, Hard
    topic_tags = Column(JSON, nullable=True)
    company_tags = Column(JSON, nullable=True)
    test_cases = Column(JSON, nullable=True) # List of inputs/outputs
    source = Column(String, nullable=True) # LeetCode, HackerRank, etc.
    external_link = Column(String, nullable=True)
    xp_reward = Column(Integer, default=0)
