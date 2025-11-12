"""Safety API endpoints"""
from fastapi import APIRouter, HTTPException
import logging

from app.models.schemas import SafetyRequest, SafetyResponse
from app.agents.safety import safety_agent

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=SafetyResponse)
async def check_safety(request: SafetyRequest):
    """
    Perform safety checks on content
    """
    try:
        return await safety_agent.check_safety(request)
    except Exception as e:
        logger.error(f"Safety check error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
