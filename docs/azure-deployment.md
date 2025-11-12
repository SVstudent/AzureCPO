# Azure Deployment Guide

## Prerequisites

1. Azure account with active subscription
2. Azure CLI installed
3. Docker installed (for container deployment)

## Azure Resources Setup

### 1. Resource Group

```bash
# Create resource group
az group create \
  --name cpo-rg \
  --location eastus
```

### 2. Azure Container Registry

```bash
# Create container registry
az acr create \
  --resource-group cpo-rg \
  --name cporegistry \
  --sku Basic

# Login to ACR
az acr login --name cporegistry
```

### 3. Azure OpenAI Service

```bash
# Create Azure OpenAI resource
az cognitiveservices account create \
  --name cpo-openai \
  --resource-group cpo-rg \
  --kind OpenAI \
  --sku S0 \
  --location eastus

# Get API key
az cognitiveservices account keys list \
  --name cpo-openai \
  --resource-group cpo-rg
```

### 4. Azure Cosmos DB

```bash
# Create Cosmos DB account
az cosmosdb create \
  --name cpo-cosmos \
  --resource-group cpo-rg \
  --locations regionName=eastus

# Create database
az cosmosdb sql database create \
  --account-name cpo-cosmos \
  --resource-group cpo-rg \
  --name personalization

# Get connection string
az cosmosdb keys list \
  --name cpo-cosmos \
  --resource-group cpo-rg \
  --type connection-strings
```

### 5. Azure Storage Account

```bash
# Create storage account
az storage account create \
  --name cpostorage \
  --resource-group cpo-rg \
  --location eastus \
  --sku Standard_LRS

# Create container
az storage container create \
  --name customer-data \
  --account-name cpostorage

# Get connection string
az storage account show-connection-string \
  --name cpostorage \
  --resource-group cpo-rg
```

### 6. Azure Cache for Redis

```bash
# Create Redis cache
az redis create \
  --name cpo-redis \
  --resource-group cpo-rg \
  --location eastus \
  --sku Basic \
  --vm-size c0
```

## Container Deployment

### Build and Push Images

```bash
# Build backend image
docker build -t cporegistry.azurecr.io/cpo-backend:latest ./backend

# Build frontend image
docker build -t cporegistry.azurecr.io/cpo-frontend:latest ./frontend

# Push images
docker push cporegistry.azurecr.io/cpo-backend:latest
docker push cporegistry.azurecr.io/cpo-frontend:latest
```

### Deploy to Azure Container Apps

```bash
# Create Container Apps environment
az containerapp env create \
  --name cpo-env \
  --resource-group cpo-rg \
  --location eastus

# Deploy backend
az containerapp create \
  --name cpo-backend \
  --resource-group cpo-rg \
  --environment cpo-env \
  --image cporegistry.azurecr.io/cpo-backend:latest \
  --target-port 8000 \
  --ingress external \
  --registry-server cporegistry.azurecr.io \
  --env-vars \
    OPENAI_API_KEY=secretref:openai-key \
    AZURE_COSMOS_ENDPOINT=secretref:cosmos-endpoint

# Deploy frontend
az containerapp create \
  --name cpo-frontend \
  --resource-group cpo-rg \
  --environment cpo-env \
  --image cporegistry.azurecr.io/cpo-frontend:latest \
  --target-port 80 \
  --ingress external
```

## Environment Variables Configuration

Create a file `azure-env-vars.json`:

```json
{
  "OPENAI_API_KEY": "your-openai-key",
  "AZURE_OPENAI_ENDPOINT": "https://cpo-openai.openai.azure.com/",
  "AZURE_OPENAI_API_KEY": "your-azure-openai-key",
  "AZURE_COSMOS_ENDPOINT": "https://cpo-cosmos.documents.azure.com:443/",
  "AZURE_COSMOS_KEY": "your-cosmos-key",
  "AZURE_STORAGE_CONNECTION_STRING": "your-storage-connection-string",
  "REDIS_HOST": "cpo-redis.redis.cache.windows.net",
  "REDIS_PORT": "6380"
}
```

Apply environment variables:

```bash
az containerapp update \
  --name cpo-backend \
  --resource-group cpo-rg \
  --set-env-vars @azure-env-vars.json
```

## Monitoring Setup

```bash
# Create Application Insights
az monitor app-insights component create \
  --app cpo-insights \
  --location eastus \
  --resource-group cpo-rg

# Get instrumentation key
az monitor app-insights component show \
  --app cpo-insights \
  --resource-group cpo-rg \
  --query instrumentationKey
```

## Scaling Configuration

```bash
# Configure autoscaling
az containerapp update \
  --name cpo-backend \
  --resource-group cpo-rg \
  --min-replicas 1 \
  --max-replicas 10 \
  --scale-rule-name http-rule \
  --scale-rule-type http \
  --scale-rule-http-concurrency 100
```

## CI/CD with GitHub Actions

Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Login to Azure
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Build and push backend
        run: |
          docker build -t cporegistry.azurecr.io/cpo-backend:latest ./backend
          docker push cporegistry.azurecr.io/cpo-backend:latest
      
      - name: Deploy to Container Apps
        run: |
          az containerapp update \
            --name cpo-backend \
            --resource-group cpo-rg \
            --image cporegistry.azurecr.io/cpo-backend:latest
```

## Security Best Practices

1. Use Azure Key Vault for secrets
2. Enable Azure AD authentication
3. Configure network security groups
4. Enable HTTPS only
5. Use managed identities
6. Enable Azure DDoS Protection

## Cost Optimization

1. Use Azure Reserved Instances
2. Configure auto-scaling
3. Use appropriate SKUs
4. Enable Azure Advisor recommendations
5. Monitor resource usage

## Troubleshooting

### View Logs

```bash
# Container logs
az containerapp logs show \
  --name cpo-backend \
  --resource-group cpo-rg \
  --follow

# Application Insights
az monitor app-insights query \
  --app cpo-insights \
  --analytics-query "requests | take 100"
```

### Check Health

```bash
# Get app URL
az containerapp show \
  --name cpo-backend \
  --resource-group cpo-rg \
  --query properties.configuration.ingress.fqdn

# Test health endpoint
curl https://<app-url>/health
```

## Cleanup

```bash
# Delete resource group (removes all resources)
az group delete --name cpo-rg --yes
```
