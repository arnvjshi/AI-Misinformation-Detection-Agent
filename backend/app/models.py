from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional
from datetime import datetime


class ClaimRequest(BaseModel):
    content: str = Field(..., min_length=10)
    source_url: Optional[HttpUrl] = None


class VerificationResult(BaseModel):
    verdict: str
    confidence_score: float
    explanation: str
    sources: List[HttpUrl]


class Trend(BaseModel):
    id: Optional[str]
    topic: str
    status: str
    keywords: List[str]
    created_at: Optional[datetime]
