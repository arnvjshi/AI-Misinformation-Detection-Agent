import os
from typing import Any, Dict, List, Optional
from dotenv import load_dotenv
from sqlalchemy import (
    MetaData, Table, Column, String, Boolean, TIMESTAMP, JSON, Float, text
)
from databases import Database

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL") or "postgresql://postgres:postgres@localhost:5432/misinformation"

database = Database(DATABASE_URL)
metadata = MetaData()

misinformation_trends = Table(
    "misinformation_trends",
    metadata,
    Column("id", String, primary_key=True),
    Column("topic", String),
    Column("keywords", JSON),
    Column("status", String),
    Column("created_at", TIMESTAMP(timezone=True), server_default=text('now()')),
)

claims = Table(
    "claims",
    metadata,
    Column("id", String, primary_key=True),
    Column("trend_id", String, nullable=True),
    Column("content", String),
    Column("source_url", String, nullable=True),
    Column("is_verified", Boolean, default=False),
    Column("received_at", TIMESTAMP(timezone=True), server_default=text('now()')),
)

verifications = Table(
    "verifications",
    metadata,
    Column("id", String, primary_key=True),
    Column("claim_id", String),
    Column("perplexity_summary", String),
    Column("gemini_analysis", JSON),
    Column("confidence_score", Float),
    Column("verdict", String),
    Column("verified_at", TIMESTAMP(timezone=True)),
)


async def insert(table: str, payload: Dict[str, Any]) -> Any:
    tbl = getattr(globals(), table)
    query = tbl.insert().values(**payload)
    return await database.execute(query)


async def update(table: str, match: Dict[str, Any], payload: Dict[str, Any]) -> Any:
    tbl = getattr(globals(), table)
    query = tbl.update().where(*(getattr(tbl.c, k) == v for k, v in match.items())).values(**payload)
    return await database.execute(query)


async def select(table: str, columns: str = "*", match: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    tbl = getattr(globals(), table)
    query = tbl.select()
    if match:
        for k, v in match.items():
            query = query.where(getattr(tbl.c, k) == v)
    return await database.fetch_all(query)
