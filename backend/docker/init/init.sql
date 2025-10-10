-- Init SQL to create required tables for the misinformation agent
-- To avoid extension dependency in init containers, use text-based IDs. Consumers may still use UUIDs client-side.
CREATE TABLE IF NOT EXISTS misinformation_trends (
    id text PRIMARY KEY,
    topic text,
    keywords jsonb,
    status text,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS claims (
    id text PRIMARY KEY,
    trend_id text REFERENCES misinformation_trends(id),
    content text,
    source_url text,
    is_verified boolean DEFAULT false,
    received_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS verifications (
    id text PRIMARY KEY,
    claim_id text REFERENCES claims(id),
    perplexity_summary text,
    gemini_analysis jsonb,
    confidence_score double precision,
    verdict text,
    verified_at timestamptz
);
