# AI Misinformation Detection Agent

An intelligent system that detects, verifies, and corrects misinformation related to global and local crises. The agent leverages state-of-the-art AI models to analyze claims, cross-reference sources, and provide verified information with confidence scores.

## 🎯 Overview

The AI Misinformation Detection Agent operates as a comprehensive solution for combating misinformation during crisis situations. It combines multiple AI technologies to provide real-time fact-checking and verification services.

### Key Features

- **Real-time Claim Verification**: Submit claims for immediate fact-checking
- **Multi-source Analysis**: Leverages Perplexity for web search and Google Gemini 2.0 Flash for analysis
- **Confidence Scoring**: Provides reliability scores for each verification
- **Trend Detection**: Identifies emerging misinformation patterns
- **RESTful API**: Easy integration with existing systems
- **Scalable Architecture**: Built for high-volume processing

## 🏗️ Architecture

```
AI-Misinformation-Detection-Agent/
├── backend/                 # FastAPI backend service
│   ├── app/                # Main application code
│   ├── docker/             # Database initialization scripts
│   ├── tests/              # Test suites
│   └── docker-compose.yml  # Local development environment
├── frontend/               # Web interface (future implementation)
└── docs/                   # Additional documentation
```

### Technology Stack

**Backend:**
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with pgAdmin
- **AI Services**: 
  - Perplexity API (source aggregation)
  - Google Gemini 2.0 Flash (analysis)
- **Infrastructure**: Docker, Docker Compose

**Frontend:** (Planned)
- React/Next.js for web interface
- Real-time updates via WebSocket

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arnvjshi/AI-Misinformation-Detection-Agent.git
   cd AI-Misinformation-Detection-Agent
   ```

2. **Start the backend services**
   ```bash
   cd backend
   docker compose up -d
   ```

3. **Set up Python environment**
   ```bash
   python -m venv .venv
   # Windows
   .\.venv\Scripts\Activate.ps1
   # Linux/Mac
   source .venv/bin/activate
   
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

5. **Start the application**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000`

## 📊 Database Schema

The system uses three main tables:

- **misinformation_trends**: Tracks emerging misinformation patterns
- **claims**: Stores submitted claims for verification
- **verifications**: Contains verification results and analysis

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `PERPLEXITY_API_KEY` | Perplexity API key for web search | Optional* |
| `GOOGLE_API_KEY` | Google AI API key for Gemini | Optional* |
| `APP_ENV` | Application environment (development/production) | No |

*When API keys are not provided, the system runs in mock mode for testing.

### Database Setup

The system automatically initializes the required database tables when using Docker Compose. For manual setup, see the backend documentation.

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/verify-claim/` | POST | Submit a claim for verification |
| `/v1/trends/` | GET | Retrieve current misinformation trends |
| `/v1/results/{claim_id}` | GET | Get verification results |
| `/docs` | GET | Interactive API documentation |

### Example Usage

**Submit a claim for verification:**
```bash
curl -X POST http://localhost:8000/v1/verify-claim/ \
  -H "Content-Type: application/json" \
  -d '{"content":"Vaccines contain microchips","source_url":"https://example.com/article"}'
```

**Get verification result:**
```bash
curl http://localhost:8000/v1/results/{claim_id}
```

## 🧪 Testing

Run the test suite:
```bash
cd backend
pytest
```

## 📚 Documentation

- [Backend Documentation](./backend/README.md) - Detailed backend setup and API reference
- [Frontend Documentation](./frontend/README.md) - Frontend development guide (coming soon)
- [API Documentation](http://localhost:8000/docs) - Interactive API docs (when running)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the CC0 1.0 Universal License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Check the documentation in the respective component directories
- Review the FAQ section in component READMEs

## 🗺️ Roadmap

- [ ] Web-based frontend interface
- [ ] Real-time trend monitoring dashboard
- [ ] Content scanner integrations (NewsAPI, Reddit, RSS)
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Mobile application

---

**Note**: This system is designed to assist in identifying potential misinformation but should not be the sole source for fact-checking decisions. Always verify important information through multiple reliable sources.  ??