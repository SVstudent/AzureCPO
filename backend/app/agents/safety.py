"""
Safety Agent
Handles content safety checks and moderation
"""
import logging
from typing import List

from app.models.schemas import (
    SafetyRequest,
    SafetyResponse,
    SafetyIssue,
    SafetyCheckType
)

logger = logging.getLogger(__name__)


class SafetyAgent:
    """
    Agent responsible for content safety and moderation
    Checks for toxicity, bias, PII, and policy violations
    """
    
    def __init__(self):
        self.safety_models = {}
        logger.info("Safety Agent initialized")
    
    async def check_safety(
        self,
        request: SafetyRequest
    ) -> SafetyResponse:
        """
        Perform comprehensive safety checks on content
        """
        logger.info(f"Running safety checks on content (length: {len(request.content)})")
        
        issues = []
        passed_checks = []
        failed_checks = []
        
        # Check for toxicity
        if SafetyCheckType.TOXICITY in request.check_types or SafetyCheckType.ALL in request.check_types:
            toxicity_score = await self._check_toxicity(request.content)
            if toxicity_score > request.threshold:
                issues.append(SafetyIssue(
                    issue_type="toxicity",
                    severity="medium",
                    confidence=toxicity_score,
                    description="Content may contain toxic language",
                    suggested_fix="Rephrase using more neutral language"
                ))
                failed_checks.append("toxicity")
            else:
                passed_checks.append("toxicity")
        
        # Check for bias
        if SafetyCheckType.BIAS in request.check_types or SafetyCheckType.ALL in request.check_types:
            bias_score = await self._check_bias(request.content)
            if bias_score > request.threshold:
                issues.append(SafetyIssue(
                    issue_type="bias",
                    severity="low",
                    confidence=bias_score,
                    description="Content may contain biased language",
                    suggested_fix="Use more inclusive language"
                ))
                failed_checks.append("bias")
            else:
                passed_checks.append("bias")
        
        # Check for PII
        if SafetyCheckType.PII in request.check_types or SafetyCheckType.ALL in request.check_types:
            pii_detected = await self._check_pii(request.content)
            if pii_detected:
                issues.append(SafetyIssue(
                    issue_type="pii",
                    severity="high",
                    confidence=0.95,
                    description="Potential PII detected in content",
                    suggested_fix="Remove or redact personal information"
                ))
                failed_checks.append("pii")
            else:
                passed_checks.append("pii")
        
        # Check content policy
        if SafetyCheckType.CONTENT_POLICY in request.check_types or SafetyCheckType.ALL in request.check_types:
            policy_violation = await self._check_content_policy(request.content)
            if policy_violation:
                issues.append(SafetyIssue(
                    issue_type="content_policy",
                    severity="high",
                    confidence=0.88,
                    description="Content may violate usage policies",
                    suggested_fix="Review content against policy guidelines"
                ))
                failed_checks.append("content_policy")
            else:
                passed_checks.append("content_policy")
        
        is_safe = len(issues) == 0
        overall_score = 0.95 if is_safe else 0.60
        
        logger.info(f"Safety check complete. Safe: {is_safe}, Issues: {len(issues)}")
        
        return SafetyResponse(
            is_safe=is_safe,
            overall_score=overall_score,
            issues=issues,
            passed_checks=passed_checks,
            failed_checks=failed_checks
        )
    
    async def _check_toxicity(self, content: str) -> float:
        """Check content for toxic language"""
        # Mock implementation - use Azure Content Safety or similar
        return 0.1
    
    async def _check_bias(self, content: str) -> float:
        """Check content for biased language"""
        # Mock implementation
        return 0.2
    
    async def _check_pii(self, content: str) -> bool:
        """Check content for PII"""
        # Mock implementation - use Azure Text Analytics
        pii_patterns = ['@', 'ssn', 'credit card']
        return any(pattern in content.lower() for pattern in pii_patterns)
    
    async def _check_content_policy(self, content: str) -> bool:
        """Check content against usage policies"""
        # Mock implementation
        return False


# Global instance
safety_agent = SafetyAgent()
