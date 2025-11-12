"""
Main FastAPI application for Customer Personalization Orchestrator
Multi-agent system for personalized customer messaging
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.routers import segmentation, retrieval, generation, safety, experiments
from app.utils.config import settings

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle"""
    logger.info("Starting Customer Personalization Orchestrator...")
    # Initialize resources (database connections, model loading, etc.)
    yield
    # Cleanup resources
    logger.info("Shutting down Customer Personalization Orchestrator...")


app = FastAPI(
    title="Customer Personalization Orchestrator",
    description="Multi-agent AI system for personalized customer messaging",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(segmentation.router, prefix="/api/v1/segmentation", tags=["segmentation"])
app.include_router(retrieval.router, prefix="/api/v1/retrieval", tags=["retrieval"])
app.include_router(generation.router, prefix="/api/v1/generation", tags=["generation"])
app.include_router(safety.router, prefix="/api/v1/safety", tags=["safety"])
app.include_router(experiments.router, prefix="/api/v1/experiments", tags=["experiments"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Customer Personalization Orchestrator API",
        "version": "0.1.0",
        "status": "operational"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "agents": {
            "segmentation": "ready",
            "retrieval": "ready",
            "generation": "ready",
            "safety": "ready",
            "experiments": "ready"
        }
    }
