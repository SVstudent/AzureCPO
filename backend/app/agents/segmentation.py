"""
Segmentation Agent
Handles customer segmentation using various ML algorithms
"""
import logging
from typing import List, Dict, Any
from datetime import datetime
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from app.models.schemas import (
    CustomerFeatures,
    Segment,
    SegmentationRequest,
    SegmentationResponse
)

logger = logging.getLogger(__name__)


class SegmentationAgent:
    """
    Agent responsible for customer segmentation
    Uses ML algorithms to group customers based on features
    """
    
    def __init__(self):
        self.scaler = StandardScaler()
        self.model = None
        self.feature_names = []
        logger.info("Segmentation Agent initialized")
    
    def _extract_features(self, customers: List[CustomerFeatures]) -> np.ndarray:
        """Extract and normalize features from customer data"""
        features_list = []
        
        for customer in customers:
            # Combine all feature dictionaries into a single vector
            feature_vector = []
            
            # Extract demographic features
            demo = customer.demographics
            feature_vector.extend([
                demo.get('age', 0),
                demo.get('income', 0),
                1 if demo.get('gender') == 'M' else 0
            ])
            
            # Extract behavioral features
            behavior = customer.behavior
            feature_vector.extend([
                behavior.get('page_views', 0),
                behavior.get('session_duration', 0),
                behavior.get('bounce_rate', 0)
            ])
            
            # Extract purchase history
            purchase = customer.purchase_history
            feature_vector.extend([
                purchase.get('total_purchases', 0),
                purchase.get('avg_order_value', 0),
                purchase.get('lifetime_value', 0)
            ])
            
            # Extract engagement metrics
            engagement = customer.engagement
            feature_vector.extend([
                engagement.get('email_open_rate', 0),
                engagement.get('click_through_rate', 0),
                engagement.get('last_interaction_days', 0)
            ])
            
            features_list.append(feature_vector)
        
        return np.array(features_list)
    
    async def segment_customers(
        self,
        request: SegmentationRequest
    ) -> SegmentationResponse:
        """
        Segment customers using specified algorithm
        """
        logger.info(f"Starting segmentation for {len(request.customers)} customers")
        
        # Extract features
        features = self._extract_features(request.customers)
        
        # Normalize features
        features_normalized = self.scaler.fit_transform(features)
        
        # Apply clustering algorithm
        if request.algorithm == "kmeans":
            self.model = KMeans(n_clusters=request.num_segments, random_state=42)
            labels = self.model.fit_predict(features_normalized)
        else:
            raise ValueError(f"Unsupported algorithm: {request.algorithm}")
        
        # Create segments
        segments = []
        assignments = {}
        
        for i in range(request.num_segments):
            segment_customers = [
                request.customers[j] 
                for j in range(len(request.customers)) 
                if labels[j] == i
            ]
            
            # Calculate segment characteristics
            segment_features = features[labels == i]
            characteristics = {
                "avg_age": float(np.mean(segment_features[:, 0])),
                "avg_income": float(np.mean(segment_features[:, 1])),
                "avg_ltv": float(np.mean(segment_features[:, 8])),
                "size": len(segment_customers)
            }
            
            segment = Segment(
                segment_id=f"seg_{i}",
                name=f"Segment {i}",
                description=f"Customer segment {i} with {len(segment_customers)} members",
                size=len(segment_customers),
                characteristics=characteristics
            )
            segments.append(segment)
            
            # Record assignments
            for customer in segment_customers:
                assignments[customer.customer_id] = f"seg_{i}"
        
        # Calculate quality score (silhouette score approximation)
        quality_score = 0.75  # Placeholder
        
        logger.info(f"Segmentation complete: {len(segments)} segments created")
        
        return SegmentationResponse(
            segments=segments,
            assignments=assignments,
            quality_score=quality_score
        )


# Global instance
segmentation_agent = SegmentationAgent()
