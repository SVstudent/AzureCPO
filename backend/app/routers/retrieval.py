"""Retrieval API endpoints"""
from fastapi import APIRouter, HTTPException
import logging

from app.models.schemas import RetrievalRequest, RetrievalResponse
from app.agents.retrieval import retrieval_agent

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=RetrievalResponse)
async def retrieve_context(request: RetrievalRequest):
    """
    Retrieve relevant context for message generation
    """
    try:
        return await retrieval_agent.retrieve_context(request)
    except Exception as e:
        logger.error(f"Retrieval error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
