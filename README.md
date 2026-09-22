# BEdu V1 — Full-Stack MVP

This version is a real local full-stack application, not just a frontend mockup.

## What works
- FastAPI backend
- SQLite database created automatically
- Student registration and login
- Session-based authentication
- Student profile and skills
- Learning resource library
- Opportunity board
- Save/unsave opportunities
- Assessments with real questions
- Automatic scoring
- Assessment history
- Personalized recommendation engine
- Responsive dashboard
- AI-guidance UI (local rules in V1; replace service with an AI API in V2)

## Run on Mac
1. Install Python 3.10+.
2. Open Terminal in this folder.
3. Create environment:
   `python3 -m venv .venv`
4. Activate:
   `source .venv/bin/activate`
5. Install:
   `pip install -r requirements.txt`
6. Start:
   `uvicorn main:app --reload`
7. Open:
   `http://127.0.0.1:8000`

The SQLite database `bedu.db` is created automatically on first run.

## Demo flow
Create an account → Dashboard → Profile → add skills → Assessments → submit Java assessment → Results → Opportunities → save jobs.

## Next production steps
- Replace local session secret with environment secret
- Use PostgreSQL/Firebase
- Add real AI provider integration
- Add admin roles and admin dashboard
- Add company accounts and interview workflow
- Add deployment configuration
- Add automated tests and CI/CD
