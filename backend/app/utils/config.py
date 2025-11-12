"""Configuration management using pydantic-settings"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings"""
    
    # Application
    APP_NAME: str = "Customer Personalization Orchestrator"
    DEBUG: bool = False
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]
    
    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4"
    OPENAI_EMBEDDING_MODEL: str = "text-embedding-ada-002"
    
    # Azure OpenAI
    AZURE_OPENAI_ENDPOINT: str = ""
    AZURE_OPENAI_API_KEY: str = ""
    AZURE_OPENAI_DEPLOYMENT: str = ""
    AZURE_OPENAI_API_VERSION: str = "2023-12-01-preview"
    
    # Azure Storage
    AZURE_STORAGE_CONNECTION_STRING: str = ""
    AZURE_STORAGE_CONTAINER: str = "customer-data"
    
    # Azure Cosmos DB
    AZURE_COSMOS_ENDPOINT: str = ""
    AZURE_COSMOS_KEY: str = ""
    AZURE_COSMOS_DATABASE: str = "personalization"
    
    # Redis Cache
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    
    # Database
    DATABASE_URL: str = "sqlite:///./cpo.db"
    
    # Agent Configuration
    SEGMENTATION_MODEL: str = "kmeans"
    MAX_SEGMENTS: int = 10
    RETRIEVAL_TOP_K: int = 5
    GENERATION_MAX_TOKENS: int = 500
    SAFETY_THRESHOLD: float = 0.8
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
