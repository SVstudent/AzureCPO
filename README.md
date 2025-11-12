# Customer Personalization Orchestrator (CPO)

A comprehensive full-stack AI-powered platform for personalized customer messaging and engagement.

## 🎯 Overview

Customer Personalization Orchestrator is a multi-agent AI system that enables businesses to:
- **Segment customers** intelligently using ML algorithms
- **Generate personalized messages** using Large Language Models
- **Retrieve relevant context** using RAG (Retrieval-Augmented Generation)
- **Ensure content safety** through automated moderation
- **Run A/B/n experiments** to optimize messaging strategies

## 🏗️ Architecture

The system consists of:
- **Backend**: FastAPI-based multi-agent system
- **Frontend**: React + Tailwind CSS dashboard
- **Data Layer**: Support for Azure Cosmos DB, Azure Storage, and vector databases
- **AI/ML**: Integration with Azure OpenAI and custom ML models

See [architecture.md](docs/architecture.md) for detailed system design.

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose (optional)

### Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/SVstudent/AzureCPO.git
cd AzureCPO

# Create environment file
cp .env.example .env
# Edit .env with your API keys and configuration

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Manual Setup

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## 📁 Project Structure

```
AzureCPO/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── agents/            # Multi-agent system
│   │   │   ├── segmentation.py
│   │   │   ├── retrieval.py
│   │   │   ├── generation.py
│   │   │   ├── safety.py
│   │   │   └── experiments.py
│   │   ├── models/            # Pydantic models
│   │   ├── routers/           # API endpoints
│   │   ├── utils/             # Utilities
│   │   └── main.py            # FastAPI app
│   ├── tests/                 # Tests
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Segments.jsx
│   │   │   ├── MessageVariants.jsx
│   │   │   ├── SafetyResults.jsx
│   │   │   └── Experiments.jsx
│   │   ├── services/          # API services
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
├── data/                       # Data storage
│   ├── raw/                   # Raw data
│   ├── processed/             # Processed data
│   └── models/                # Trained models
├── docs/                       # Documentation
│   └── architecture.md
├── notebooks/                  # Jupyter notebooks
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🤖 Agent System

### 1. Segmentation Agent
Clusters customers based on features like demographics, behavior, and purchase history using ML algorithms (K-means, DBSCAN, etc.).

**Endpoint**: `POST /api/v1/segmentation`

### 2. Retrieval Agent
Retrieves relevant context for message personalization using vector search and semantic similarity.

**Endpoint**: `POST /api/v1/retrieval`

### 3. Generation Agent
Generates personalized message variants using LLMs (GPT-4, Azure OpenAI).

**Endpoint**: `POST /api/v1/generation`

### 4. Safety Agent
Performs content safety checks including toxicity, bias, PII detection, and policy compliance.

**Endpoint**: `POST /api/v1/safety`

### 5. Experiments Agent
Manages A/B/n testing experiments and provides statistical analysis.

**Endpoint**: `POST /api/v1/experiments`

## 📊 Dashboard Features

### Customer Segments
- View and manage customer segments
- Segment characteristics and metrics
- Real-time segment updates

### Message Variants
- Browse AI-generated message variants
- Performance metrics (CTR, conversion rate)
- Confidence scores for each variant

### Safety Results
- Content safety check results
- Issue detection and suggestions
- Compliance monitoring

### A/B/n Experiments
- Create and manage experiments
- Real-time performance tracking
- Statistical significance testing
- Winner identification

## 🔧 Configuration

### Environment Variables

Backend (`.env`):
```env
# OpenAI Configuration
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4

# Azure OpenAI
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your_key_here
AZURE_OPENAI_DEPLOYMENT=your_deployment

# Azure Storage
AZURE_STORAGE_CONNECTION_STRING=your_connection_string
AZURE_COSMOS_ENDPOINT=https://your-account.documents.azure.com:443/
AZURE_COSMOS_KEY=your_key_here

# Database
DATABASE_URL=sqlite:///./cpo.db
```

Frontend (`.env`):
```env
VITE_API_URL=http://localhost:8000/api/v1
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Azure Deployment

See [docs/azure-deployment.md](docs/azure-deployment.md) for detailed Azure deployment instructions.

Quick Azure deployment:
```bash
# Deploy to Azure Container Apps
az containerapp up \
  --name cpo-backend \
  --source ./backend \
  --ingress external \
  --target-port 8000
```

## 🔒 Security

- All API keys are stored in environment variables
- Content safety checks on all generated messages
- PII detection and redaction
- Azure AD integration ready
- CORS configuration for production

## 📝 API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with FastAPI, React, and Tailwind CSS
- Powered by Azure OpenAI and Azure services
- UI icons from Heroicons

## 📧 Contact

For questions and support, please open an issue in the GitHub repository.