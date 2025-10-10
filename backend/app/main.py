import uuid
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from dotenv import load_dotenv

load_dotenv()

from .models import ClaimRequest, VerificationResult, Trend
from .db import insert, select, database
from .verification import run_verification_pipeline


app = FastAPI(title="AI Misinformation Detection Agent")


@app.post("/v1/verify-claim/", status_code=202)
async def verify_claim(request: ClaimRequest, background_tasks: BackgroundTasks):
    claim_id = str(uuid.uuid4())
    payload = {
        "id": claim_id,
        "content": request.content,
        "source_url": str(request.source_url) if request.source_url else None,
        "is_verified": False,
    }
    try:
        await insert("claims", payload)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    background_tasks.add_task(run_verification_pipeline, claim_id)
    return JSONResponse(status_code=202, content={"message": "Claim accepted. Verification is in progress.", "claim_id": claim_id})


@app.get("/v1/trends/", response_model=List[Trend])
async def get_current_trends():
    try:
        rows = await select("misinformation_trends", columns="*")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    # Filter by status
    filtered = [r for r in rows if r.get("status") in ("emerging", "active")]
    return filtered


@app.get("/v1/results/{claim_id}", response_model=VerificationResult)
async def get_verification_result(claim_id: str):
    try:
        rows = await select("verifications", columns="*", match={"claim_id": claim_id})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    if not rows:
        raise HTTPException(status_code=404, detail="Verification not found or still processing")

    v = rows[0]
    # Attempt to parse sources
    sources = []
    try:
        raw = v.get("gemini_analysis") or {}
        sources = raw.get("sources", []) if isinstance(raw, dict) else []
    except Exception:
        sources = []

    return VerificationResult(
        verdict=v.get("verdict") or "Unverifiable",
        confidence_score=v.get("confidence_score") or 0.0,
    explanation=str((v.get("gemini_analysis") or {}).get("explanation") if isinstance(v.get("gemini_analysis"), dict) else ""),
        sources=sources,
    )


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
