# ⚔️ ClashCode AI - Gamified DSA Arena

ClashCode AI is a next-generation platform for practicing Data Structures and Algorithms (DSA) and preparing for placement interviews. It transforms the often tedious grind of solo coding into an addictive, gamified experience featuring XP progression, daily streaks, leveling systems, and a curated library of over 3,000 algorithmic challenges.

## ✨ Features
* **Massive Problem Library**: Hand-picked 3,000+ problems sourced from LeetCode, HackerRank, and CodeChef.
* **Gamified Progression**: Earn XP based on difficulty (Easy: 10 XP, Medium: 30 XP, Hard: 100 XP) and level up your global rank.
* **Daily Missions & Streaks**: Maintain daily solving streaks to keep your momentum high.
* **Modern Cyberpunk UI**: Premium dark-mode aesthetics using Tailwind CSS and Framer Motion animations.
* **Seamless Authentication**: One-click Google Login powered by NextAuth.js.

## 🛠️ Tech Stack
* **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Framer Motion, NextAuth.js
* **Backend:** Python FastAPI, SQLAlchemy (Async), asyncpg, Pydantic, JWT Auth
* **Database:** PostgreSQL (Containerized via Docker)
* **Data Processing:** Pandas (for heavy CSV seeding)

---

## 🚀 Getting Started (Local Development)

### Prerequisites
Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/) (v18 or higher)
* [Python](https://www.python.org/downloads/) (3.10 or higher)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Must be running)

### 1. Database Setup (Docker)
Start the PostgreSQL and Redis containers using Docker Compose from the root directory:
```bash
docker-compose up -d
```

### 2. Backend Setup (FastAPI)
Open a new terminal and navigate to the backend folder:
```bash
cd backend
```
Create a virtual environment and activate it:
```bash
# On Windows
python -m venv venv
.\venv\Scripts\Activate.ps1

# On Mac/Linux
python3 -m venv venv
source venv/bin/activate
```
Install the Python dependencies:
```bash
pip install -r requirements.txt
```
*(Note: If `requirements.txt` is not present, manually install: `fastapi uvicorn sqlalchemy asyncpg asyncmy pydantic pydantic-settings python-dotenv pandas openpyxl python-jose[cryptography] passlib[bcrypt] python-multipart`)*

Seed the 3,000 problems into your database:
```bash
python scripts/seed_problems.py
```
Start the FastAPI server:
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The API will be available at `http://localhost:8000` (Docs: `http://localhost:8000/docs`).

### 3. Frontend Setup (Next.js)
Open a new terminal and navigate to the frontend folder **(Important: Do not run this in the root repo)**:
```bash
cd frontend
```
Install the Node dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:3000`.

---

## ☁️ Vercel Deployment Notes
If you are deploying this project to Vercel, you **must** configure the Root Directory:
1. Go to your Vercel Project Settings > General.
2. Find the **Root Directory** setting.
3. Change it to `frontend`.
4. Add your Environment Variables (`NEXT_PUBLIC_API_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`).
5. Save and Redeploy.

## 📜 License
This project was designed and built as a final-year placement preparation platform. Feel free to fork and modify!
