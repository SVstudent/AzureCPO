"""Experiments API endpoints"""
from fastapi import APIRouter, HTTPException
import logging

from app.models.schemas import ExperimentRequest, ExperimentResponse
from app.agents.experiments import experiments_agent

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=ExperimentResponse)
async def create_experiment(request: ExperimentRequest):
    """
    Create a new A/B/n experiment
    """
    try:
        return await experiments_agent.create_experiment(request)
    except Exception as e:
        logger.error(f"Experiment creation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{experiment_id}", response_model=ExperimentResponse)
async def get_experiment(experiment_id: str):
    """
    Get experiment results
    """
    try:
        return await experiments_agent.get_experiment_results(experiment_id)
    except Exception as e:
        logger.error(f"Error fetching experiment: {str(e)}")
        raise HTTPException(status_code=404, detail=str(e))
