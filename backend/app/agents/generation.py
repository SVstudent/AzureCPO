"""
Generation Agent
Handles personalized message generation using LLMs
"""
import logging
from typing import Dict, Any
import uuid

from app.models.schemas import (
    GenerationRequest,
    GenerationResponse,
    MessageVariant
)
from app.utils.config import settings

logger = logging.getLogger(__name__)


class GenerationAgent:
    """
    Agent responsible for generating personalized messages
    Uses LLMs (OpenAI/Azure OpenAI) for content generation
    """
    
    def __init__(self):
        self.model = settings.OPENAI_MODEL
        logger.info("Generation Agent initialized")
    
    async def generate_messages(
        self,
        request: GenerationRequest
    ) -> GenerationResponse:
        """
        Generate personalized message variants
        """
        logger.info(f"Generating {request.variants} variants for segment {request.segment_id}")
        
        # Mock implementation - in production, use OpenAI/Azure OpenAI
        # This would make actual API calls to generate content
        
        variants = []
        
        templates = [
            {
                "subject": "Exclusive Offer Just for You",
                "content": "Hi there! We noticed you've been eyeing our premium collection. Here's a special 20% discount just for valued customers like you."
            },
            {
                "subject": "Your Personalized Recommendations",
                "content": "Based on your recent purchases, we thought you'd love these hand-picked items. Check them out with our exclusive member pricing!"
            },
            {
                "subject": "Don't Miss Out on This Limited Offer",
                "content": "As one of our top customers, you get early access to our seasonal sale. Shop now before items sell out!"
            }
        ]
        
        for i in range(min(request.variants, len(templates))):
            template = templates[i]
            variant = MessageVariant(
                variant_id=f"var_{uuid.uuid4().hex[:8]}",
                content=template["content"],
                subject=template["subject"],
                metadata={
                    "segment_id": request.segment_id,
                    "template_id": request.template_id or f"template_{i}",
                    "personalization_level": request.personalization_level,
                    "context_used": list(request.context.keys())
                },
                confidence=0.85 - (i * 0.05)
            )
            variants.append(variant)
        
        logger.info(f"Generated {len(variants)} message variants")
        
        return GenerationResponse(
            variants=variants,
            segment_id=request.segment_id,
            generation_metadata={
                "model": self.model,
                "timestamp": "2024-01-01T00:00:00Z",
                "tokens_used": 150 * len(variants)
            }
        )


# Global instance
generation_agent = GenerationAgent()
