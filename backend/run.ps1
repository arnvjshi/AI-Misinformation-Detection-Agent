Write-Host "Starting uvicorn for AI Misinformation Detection Agent..."
uvicorn app.main:app --reload --port 8000
