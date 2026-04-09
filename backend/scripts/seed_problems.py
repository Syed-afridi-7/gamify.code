import asyncio
import pandas as pd
import sys
import os

# Add the parent directory to sys.path to allow importing from 'app'
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal, engine, Base
from app.models.problem import Problem

XP_MAP = {
    "Easy": 10,
    "Medium": 30,
    "Hard": 100
}

async def seed_problems():
    print("🚀 Starting problem seeding...")
    
    # Ensure tables are created
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    csv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "competitive_programming_3000.csv")
    
    if not os.path.exists(csv_path):
        print(f"❌ Error: CSV file not found at {csv_path}")
        return

    df = pd.read_csv(csv_path)
    print(f"📊 Found {len(df)} problems in CSV.")

    async with SessionLocal() as session:
        count = 0
        for _, row in df.iterrows():
            # Parse tags from string "Tag1, Tag2" to list ["Tag1", "Tag2"]
            tags = [t.strip() for t in str(row['tags']).split(',')] if pd.notna(row['tags']) else []
            
            difficulty = str(row['difficulty'])
            xp = XP_MAP.get(difficulty, 20) # Default to 20 if unknown

            problem = Problem(
                title=row['title'],
                description=row['summary'],
                difficulty=difficulty,
                topic_tags=tags,
                source=row['source'],
                external_link=row['link'],
                xp_reward=xp
            )
            session.add(problem)
            count += 1
            
            # Commit in batches for efficiency
            if count % 100 == 0:
                await session.commit()
                print(f"✅ Loaded {count} problems...")

        await session.commit()
        print(f"🎊 Finished! Total problems seeded: {count}")

if __name__ == "__main__":
    asyncio.run(seed_problems())
