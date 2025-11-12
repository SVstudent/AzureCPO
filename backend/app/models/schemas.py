"""Pydantic models for API requests and responses"""
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
from datetime import datetime
from enum import Enum


class CustomerFeatures(BaseModel):
    """Customer feature vector for segmentation"""
    customer_id: str
    demographics: Dict[str, Any] = Field(default_factory=dict)
    behavior: Dict[str, Any] = Field(default_factory=dict)
    purchase_history: Dict[str, Any] = Field(default_factory=dict)
    engagement: Dict[str, Any] = Field(default_factory=dict)


class Segment(BaseModel):
    """Customer segment"""
    segment_id: str
    name: str
    description: str
    size: int
    characteristics: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.utcnow)


class SegmentationRequest(BaseModel):
    """Request for customer segmentation"""
    customers: List[CustomerFeatures]
    num_segments: Optional[int] = 5
    algorithm: Optional[str] = "kmeans"


class SegmentationResponse(BaseModel):
    """Response from segmentation agent"""
    segments: List[Segment]
    assignments: Dict[str, str]  # customer_id -> segment_id
    quality_score: float


class RetrievalRequest(BaseModel):
    """Request for context retrieval"""
    query: str
    segment_id: Optional[str] = None
    top_k: int = 5
    filters: Optional[Dict[str, Any]] = None


class RetrievalResponse(BaseModel):
    """Response from retrieval agent"""
    results: List[Dict[str, Any]]
    scores: List[float]
    metadata: Dict[str, Any]


class GenerationRequest(BaseModel):
    """Request for message generation"""
    segment_id: str
    context: Dict[str, Any]
    template_id: Optional[str] = None
    variants: int = 3
    personalization_level: str = "high"


class MessageVariant(BaseModel):
    """Generated message variant"""
    variant_id: str
    content: str
    subject: Optional[str] = None
    metadata: Dict[str, Any]
    confidence: float


class GenerationResponse(BaseModel):
    """Response from generation agent"""
    variants: List[MessageVariant]
    segment_id: str
    generation_metadata: Dict[str, Any]


class SafetyCheckType(str, Enum):
    """Types of safety checks"""
    TOXICITY = "toxicity"
    BIAS = "bias"
    PII = "pii"
    CONTENT_POLICY = "content_policy"
    ALL = "all"


class SafetyRequest(BaseModel):
    """Request for safety check"""
    content: str
    check_types: List[SafetyCheckType] = [SafetyCheckType.ALL]
    threshold: float = 0.8


class SafetyIssue(BaseModel):
    """Safety issue detected"""
    issue_type: str
    severity: str
    confidence: float
    description: str
    suggested_fix: Optional[str] = None


class SafetyResponse(BaseModel):
    """Response from safety agent"""
    is_safe: bool
    overall_score: float
    issues: List[SafetyIssue]
    passed_checks: List[str]
    failed_checks: List[str]


class ExperimentType(str, Enum):
    """Types of experiments"""
    AB = "ab"
    ABN = "abn"
    MULTIVARIATE = "multivariate"


class ExperimentRequest(BaseModel):
    """Request to create an experiment"""
    name: str
    description: str
    experiment_type: ExperimentType
    variants: List[str]
    segment_ids: List[str]
    metrics: List[str]
    duration_days: int = 14


class ExperimentMetrics(BaseModel):
    """Experiment metrics"""
    variant_id: str
    impressions: int
    clicks: int
    conversions: int
    ctr: float
    conversion_rate: float
    revenue: Optional[float] = None


class ExperimentResponse(BaseModel):
    """Response from experiments agent"""
    experiment_id: str
    status: str
    variants_performance: List[ExperimentMetrics]
    winner: Optional[str] = None
    confidence_level: Optional[float] = None
    insights: Dict[str, Any]
