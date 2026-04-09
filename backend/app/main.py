from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine, Base
from app.models.user import User # Import to register tables
from app.models.problem import Problem

from app.api.v1.problems import router as problems_router
from app.api.v1.auth import router as auth_router
from app.api.v1.user import router as user_router

app = FastAPI(title="ClashCode AI API", version="1.0.0")

# Register routers
app.include_router(problems_router, prefix="/api/v1/problems", tags=["Problems"])
app.include_router(auth_router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(user_router, prefix="/api/v1/user", tags=["User Progression"])

# Set up CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://gamifycode.vercel.app",
    "https://gamifycode-3fo9az5nf-syed-afridi-7s-projects.vercel.app",
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
