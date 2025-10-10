Run with Docker (Postgres + pgAdmin)

1. Start the database and pgAdmin:

```powershell
docker compose up -d
```

2. Copy `.env.example` to `.env` and ensure `DATABASE_URL` points to the `db` service (default in `.env.example` uses `db` hostname).

3. Start the app (locally or in a container):

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
# AI Misinformation Detection Agent - Backend

This is the FastAPI backend for the AI Misinformation Detection Agent. It provides endpoints to submit claims, retrieve trends, and fetch verification results. The backend uses Supabase (Postgres) as its datastore and integrates with external verification APIs (Perplexity and Google Gemini).

Quick start
1. Copy `.env.example` to `.env` and fill in keys.
2. Create the Python environment and install dependencies:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

3. Run the server:

```powershell
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Example requests

POST a claim for verification:

```powershell
curl -X POST http://localhost:8000/v1/verify-claim/ -H "Content-Type: application/json" -d '{"content":"Vaccines contain microchips","source_url":"https://some.source/article"}'
```

GET trends:

```powershell
curl http://localhost:8000/v1/trends/
```

GET verification result:

```powershell
curl http://localhost:8000/v1/results/<claim_id>
```

