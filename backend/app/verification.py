import os
import json
import uuid
import asyncio
from typing import Dict, Any, List
from datetime import datetime
import httpx

from .db import insert, update, select

PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


async def call_perplexity(query: str) -> Dict[str, Any]:
    """Call Perplexity API. If no API key is provided, return a mocked response."""
    if not PERPLEXITY_API_KEY:
        # Mocked response
        await asyncio.sleep(0.5)
        return {
            "summary": f"Mocked Perplexity summary for query: {query}",
            "sources": [
                "https://example.com/article1",
                "https://example.com/article2",
                "https://example.com/article3",
            ],
        }

    # Example HTTP call — adjust to Perplexity's actual API
    headers = {"Authorization": f"Bearer {PERPLEXITY_API_KEY}", "Content-Type": "application/json"}
    async with httpx.AsyncClient(timeout=30) as client:
        payload = {"query": query}
        resp = await client.post("https://api.perplexity.ai/search", headers=headers, json=payload)
        resp.raise_for_status()
        return resp.json()


async def call_gemini(claim: str, perplexity_summary: str) -> Dict[str, Any]:
    """Call Google Gemini 2.0 Flash. If no API key, return a mocked verdict."""
    prompt = f"You are a misinformation analysis expert. Claim: \"{claim}\" Evidence: \"{perplexity_summary}\"\nReturn JSON with verdict, confidence_score, explanation, sources"

    if not GOOGLE_API_KEY:
        await asyncio.sleep(0.5)
        return {
            "verdict": "Unverifiable",
            "confidence_score": 0.35,
            "explanation": "Mocked - insufficient evidence to verify the claim.",
            "sources": ["https://example.com/article1"]
        }

    headers = {"Authorization": f"Bearer {GOOGLE_API_KEY}", "Content-Type": "application/json"}
    body = {"model": "gemini-2.0-flash", "prompt": prompt, "max_tokens": 800}
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post("https://api.google.com/v1/ai/generate", headers=headers, json=body)
        resp.raise_for_status()
        data = resp.json()
        # Here we expect data['output'] or similar — adapt depending on API shape
        text = data.get("output") or data.get("text") or json.dumps(data)
        # Try to parse JSON from response text
        try:
            parsed = json.loads(text)
        except Exception:
            parsed = {
                "verdict": "Unverifiable",
                "confidence_score": 0.0,
                "explanation": "Could not parse model output.",
                "sources": []
            }
        return parsed


async def run_verification_pipeline(claim_id: str):
    # Fetch claim
    claims = await select("claims", columns="*", match={"id": claim_id})
    if not claims:
        return
    claim = claims[0]
    content = claim.get("content") or ""

    # Query Perplexity
    perplexity_prompt = f"Fact-check the following claim and provide a summary of findings with at least 5 credible sources: \"{content}\""
    perplexity_resp = await call_perplexity(perplexity_prompt)

    # Store raw perplexity response in verifications table
    verif_payload = {
        "id": str(uuid.uuid4()),
        "claim_id": claim_id,
        "perplexity_summary": json.dumps(perplexity_resp),
        "gemini_analysis": None,
        "confidence_score": None,
        "verdict": None,
        "verified_at": None,
    }
    inserted = await insert("verifications", verif_payload)

    # Call Gemini
    gemini_resp = await call_gemini(content, json.dumps(perplexity_resp))

    # Update verification with final result
    await update("verifications", match={"claim_id": claim_id}, payload={
        "gemini_analysis": gemini_resp,
        "confidence_score": gemini_resp.get("confidence_score"),
        "verdict": gemini_resp.get("verdict"),
        "verified_at": datetime.utcnow().isoformat()
    })

    # Mark claim as verified
    await update("claims", match={"id": claim_id}, payload={"is_verified": True})
