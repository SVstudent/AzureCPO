"""Segmentation API endpoints"""
from fastapi import APIRouter, HTTPException
import logging

from app.models.schemas import SegmentationRequest, SegmentationResponse
from app.agents.segmentation import segmentation_agent

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=SegmentationResponse)
async def segment_customers(request: SegmentationRequest):
    """
    Segment customers based on their features
    """
    try:
        return await segmentation_agent.segment_customers(request)
    except Exception as e:
        logger.error(f"Segmentation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/segments")
async def list_segments():
    """
    List all available segments
    """
    return {
        "segments": [],
        "total": 0
    }
