# AI Misinformation Detection Agent - Backend

FastAPI-based backend service for the AI Misinformation Detection Agent. This service provides RESTful APIs for claim verification, trend analysis, and misinformation detection using advanced AI models.

## 🏗️ Architecture

The backend follows a modular architecture with clear separation of concerns:

```
backend/
├── app/
│   ├── __init__.py         # Package initialization
│   ├── main.py             # FastAPI application and routes
│   ├── models.py           # Pydantic data models
│   ├── db.py               # Database connection and operations
│   └── verification.py     # AI verification pipeline
├── docker/
│   └── init/
│       └── init.sql        # Database schema initialization
├── tests/
│   └── test_app_import.py  # Test suites
├── docker-compose.yml      # Local development environment
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
└── run.ps1                # Quick start script
```

## 🚀 Quick Start

### Method 1: Docker (Recommended)

1. **Start the database and pgAdmin:**
   ```powershell
   docker compose up -d
   ```

2. **Set up environment:**
   ```powershell
   cp .env.example .env
   # Edit .env with your API keys (optional for testing)
   ```

3. **Create Python environment and install dependencies:**
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```

4. **Start the application:**
   ```powershell
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Method 2: Manual Setup

1. **Install PostgreSQL locally**
2. **Create database:**
   ```sql
   CREATE DATABASE misinformation;
   ```
3. **Run the init script:** `docker/init/init.sql`
4. **Update `.env` with your database URL**
5. **Follow steps 3-4 from Docker method**

## 📊 Database Schema

### Tables

#### `misinformation_trends`
Tracks emerging misinformation patterns and topics.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary key (UUID as text) |
| `topic` | text | General topic of the trend |
| `keywords` | jsonb | Array of keywords for tracking |
| `status` | text | Current status (emerging, active, debunked) |
| `created_at` | timestamptz | When the trend was first detected |

#### `claims`
Stores submitted claims awaiting or completed verification.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary key (UUID as text) |
| `trend_id` | text | Foreign key to misinformation_trends |
| `content` | text | The claim text content |
| `source_url` | text | Original URL where claim was found |
| `is_verified` | boolean | Verification completion flag |
| `received_at` | timestamptz | When the claim was submitted |

#### `verifications`
Contains verification results and AI analysis.

| Column | Type | Description |
|--------|------|-------------|
| `id` | text | Primary key (UUID as text) |
| `claim_id` | text | Foreign key to claims |
| `perplexity_summary` | text | Raw Perplexity API response |
| `gemini_analysis` | jsonb | Structured Gemini analysis |
| `confidence_score` | float | Confidence score (0.0-1.0) |
| `verdict` | text | Final verdict (False, Misleading, True, Unverifiable) |
| `verified_at` | timestamptz | When verification was completed |

## 🔌 API Reference

### Endpoints

#### `POST /v1/verify-claim/`
Submit a claim for verification.

**Request Body:**
```json
{
  "content": "The claim text to verify",
  "source_url": "https://example.com/article" // optional
}
```

**Response:**
```json
{
  "message": "Claim accepted. Verification is in progress.",
  "claim_id": "uuid-string"
}
```

#### `GET /v1/trends/`
Retrieve current active misinformation trends.

**Response:**
```json
[
  {
    "id": "uuid-string",
    "topic": "Vaccine Safety",
    "status": "active",
    "keywords": ["vaccine", "microchip", "side effects"],
    "created_at": "2025-10-10T12:00:00Z"
  }
]
```

#### `GET /v1/results/{claim_id}`
Get verification results for a specific claim.

**Response:**
```json
{
  "verdict": "False",
  "confidence_score": 0.85,
  "explanation": "The claim contradicts multiple credible sources...",
  "sources": [
    "https://who.int/article1",
    "https://cdc.gov/article2"
  ]
}
```

### Interactive API Documentation

When the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🤖 AI Integration

### Perplexity API
Used for web search and source aggregation. When no API key is provided, returns mocked responses for testing.

**Mock Response Format:**
```json
{
  "summary": "Mocked summary of findings...",
  "sources": ["https://example.com/source1", "https://example.com/source2"]
}
```

### Google Gemini 2.0 Flash
Analyzes Perplexity results to generate structured verdicts. Also provides mocked responses when API key is unavailable.

**Analysis Pipeline:**
1. Format prompt with claim and evidence
2. Request structured JSON response
3. Parse and validate result
4. Store in database with confidence score

## 🧪 Testing

### Run Tests
```powershell
# Install test dependencies
pip install pytest pytest-asyncio

# Run all tests
pytest

# Run specific test
pytest tests/test_app_import.py

# Run with coverage
pytest --cov=app tests/
```

### Manual Testing

**Test claim verification:**
```powershell
curl -X POST http://localhost:8000/v1/verify-claim/ \
  -H "Content-Type: application/json" \
  -d '{"content":"COVID-19 vaccines alter human DNA","source_url":"https://example.com/article"}'
```

**Check verification status:**
```powershell
curl http://localhost:8000/v1/results/{claim_id}
```

**View active trends:**
```powershell
curl http://localhost:8000/v1/trends/
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/misinformation` | Yes |
| `PERPLEXITY_API_KEY` | Perplexity API key | None (uses mocks) | No |
| `GOOGLE_API_KEY` | Google AI API key | None (uses mocks) | No |
| `APP_ENV` | Environment (development/production) | development | No |

### Database Connection

**For Docker setup:**
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/misinformation
```

**For local PostgreSQL:**
```
DATABASE_URL=postgresql://username:password@localhost:5432/misinformation
```

## 🐳 Docker Services

### Services Defined

- **db**: PostgreSQL 15 database
  - Port: 5432
  - Credentials: postgres/postgres
  - Database: misinformation

- **pgadmin**: Database administration interface
  - Port: 5050
  - Credentials: admin@local/admin
  - URL: http://localhost:5050

### Docker Commands

```powershell
# Start services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Reset database (removes all data)
docker compose down -v
docker compose up -d
```

## 🔧 Development

### Code Structure

- **`main.py`**: FastAPI app, routes, startup/shutdown events
- **`models.py`**: Pydantic models for request/response validation
- **`db.py`**: Database connection, table definitions, CRUD operations
- **`verification.py`**: AI pipeline for claim verification

### Adding New Features

1. **New API endpoint**: Add to `main.py`
2. **Database changes**: Update `db.py` and `init.sql`
3. **Data models**: Add to `models.py`
4. **Business logic**: Extend `verification.py`

### Debugging

**Enable debug logging:**
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

**Database debugging:**
```python
# In db.py, add print statements
async def select(table: str, **kwargs):
    print(f"Executing query on {table} with {kwargs}")
    # ... rest of function
```

## 🚨 Troubleshooting

### Common Issues

1. **Database connection failed**
   - Ensure PostgreSQL is running
   - Check `DATABASE_URL` in `.env`
   - Verify Docker services: `docker compose ps`

2. **Import errors**
   - Activate virtual environment
   - Install dependencies: `pip install -r requirements.txt`

3. **API keys not working**
   - Check `.env` file exists and has correct keys
   - Verify API key permissions
   - System works in mock mode without keys

4. **Port already in use**
   - Change port in uvicorn command: `--port 8001`
   - Check for other running services

### Logs and Monitoring

**Application logs:**
```powershell
# During development
uvicorn app.main:app --reload --log-level debug

# View database logs
docker compose logs db
```

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env` files
- **API Keys**: Store securely, rotate regularly
- **Database**: Use strong passwords in production
- **CORS**: Configure appropriately for frontend integration
- **Rate Limiting**: Consider implementing for production use

## 📈 Performance

### Optimization Tips

1. **Database**: Add indexes for frequently queried columns
2. **Caching**: Implement Redis for repeated queries
3. **Connection Pooling**: Configure for high-load scenarios
4. **Async Processing**: Use background tasks for long operations

### Monitoring

- **Health Check**: Add `/health` endpoint
- **Metrics**: Integrate Prometheus/Grafana
- **Logging**: Use structured logging for production

---

For more information, see the [main project documentation](../README.md).

