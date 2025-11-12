"""
Experiments Agent
Handles A/B/n testing and experimentation
"""
import logging
from typing import List
import uuid
from datetime import datetime, timedelta

from app.models.schemas import (
    ExperimentRequest,
    ExperimentResponse,
    ExperimentMetrics,
    ExperimentType
)

logger = logging.getLogger(__name__)


class ExperimentsAgent:
    """
    Agent responsible for running and analyzing experiments
    Supports A/B, A/B/n, and multivariate testing
    """
    
    def __init__(self):
        self.active_experiments = {}
        logger.info("Experiments Agent initialized")
    
    async def create_experiment(
        self,
        request: ExperimentRequest
    ) -> ExperimentResponse:
        """
        Create and configure a new experiment
        """
        experiment_id = f"exp_{uuid.uuid4().hex[:8]}"
        
        logger.info(f"Creating {request.experiment_type} experiment: {request.name}")
        
        # Store experiment configuration
        self.active_experiments[experiment_id] = {
            "config": request,
            "start_date": datetime.utcnow(),
            "end_date": datetime.utcnow() + timedelta(days=request.duration_days)
        }
        
        # Generate mock performance data
        variants_performance = []
        for i, variant_id in enumerate(request.variants):
            # Mock metrics with slight variations
            base_impressions = 10000
            base_ctr = 0.05
            base_conversion = 0.02
            
            impressions = base_impressions + (i * 500)
            clicks = int(impressions * (base_ctr + (i * 0.005)))
            conversions = int(clicks * (base_conversion + (i * 0.002)))
            
            metrics = ExperimentMetrics(
                variant_id=variant_id,
                impressions=impressions,
                clicks=clicks,
                conversions=conversions,
                ctr=clicks / impressions if impressions > 0 else 0,
                conversion_rate=conversions / clicks if clicks > 0 else 0,
                revenue=conversions * 50.0
            )
            variants_performance.append(metrics)
        
        # Determine winner (highest conversion rate)
        winner = max(
            variants_performance,
            key=lambda x: x.conversion_rate
        ).variant_id
        
        confidence_level = 0.95 if len(request.variants) > 1 else None
        
        insights = {
            "best_performing_variant": winner,
            "improvement_over_control": "15.3%",
            "statistical_significance": "Yes" if confidence_level and confidence_level > 0.90 else "No",
            "recommendation": f"Roll out {winner} to all segments"
        }
        
        logger.info(f"Experiment {experiment_id} created with {len(request.variants)} variants")
        
        return ExperimentResponse(
            experiment_id=experiment_id,
            status="running",
            variants_performance=variants_performance,
            winner=winner,
            confidence_level=confidence_level,
            insights=insights
        )
    
    async def get_experiment_results(self, experiment_id: str) -> ExperimentResponse:
        """Get current results for an experiment"""
        if experiment_id not in self.active_experiments:
            raise ValueError(f"Experiment {experiment_id} not found")
        
        # Return updated results
        # In production, this would query real metrics from analytics
        logger.info(f"Fetching results for experiment {experiment_id}")
        
        # Return mock response (implementation similar to create_experiment)
        return ExperimentResponse(
            experiment_id=experiment_id,
            status="running",
            variants_performance=[],
            winner=None,
            confidence_level=None,
            insights={}
        )


# Global instance
experiments_agent = ExperimentsAgent()
