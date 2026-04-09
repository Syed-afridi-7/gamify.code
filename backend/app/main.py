from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine, Base
from app.models.user import User # Import to register tables
from app.models.problem import Problem

app = FastAPI(title="ClashCode AI API", version="1.0.0")

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        # Caution: This creates tables if they don't exist.
        # In production, use Alembic migrations.
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
def read_root():
    return {"message": "Welcome to ClashCode AI Backend!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
