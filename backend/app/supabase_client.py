import os
from dotenv import load_dotenv
from supabase import create_client
from typing import Any, Dict, List, Optional

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    # We intentionally allow missing keys during initial development; calls will raise later if used.
    _client = None
else:
    _client = create_client(SUPABASE_URL, SUPABASE_KEY)


def get_client():
    if _client is None:
        raise RuntimeError("Supabase client not configured. Set SUPABASE_URL and SUPABASE_KEY in environment.")
    return _client


def insert(table: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    client = get_client()
    res = client.table(table).insert(payload).execute()
    return res.data


def update(table: str, match: Dict[str, Any], payload: Dict[str, Any]) -> Dict[str, Any]:
    client = get_client()
    res = client.table(table).update(payload).match(match).execute()
    return res.data


def select(table: str, columns: str = "*", match: Optional[Dict[str, Any]] = None) -> List[Dict[str, Any]]:
    client = get_client()
    query = client.table(table).select(columns)
    if match:
        query = query.match(match)
    res = query.execute()
    return res.data
