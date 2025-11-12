"""Generation API endpoints"""
from fastapi import APIRouter, HTTPException
import logging

from app.models.schemas import GenerationRequest, GenerationResponse
from app.agents.generation import generation_agent

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=GenerationResponse)
async def generate_messages(request: GenerationRequest):
    """
    Generate personalized message variants
    """
    try:
        return await generation_agent.generate_messages(request)
    except Exception as e:
        logger.error(f"Generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
