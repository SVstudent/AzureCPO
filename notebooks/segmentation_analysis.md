# Customer Segmentation Analysis

This notebook demonstrates how to use the Customer Personalization Orchestrator's segmentation capabilities.

## Setup

```python
import requests
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# API endpoint
API_BASE = "http://localhost:8000/api/v1"
```

## Load Customer Data

```python
# Sample customer data
customers = [
    {
        "customer_id": f"cust_{i}",
        "demographics": {
            "age": np.random.randint(18, 70),
            "income": np.random.randint(30000, 150000),
            "gender": np.random.choice(["M", "F"])
        },
        "behavior": {
            "page_views": np.random.randint(1, 100),
            "session_duration": np.random.randint(60, 3600),
            "bounce_rate": np.random.uniform(0, 1)
        },
        "purchase_history": {
            "total_purchases": np.random.randint(0, 50),
            "avg_order_value": np.random.uniform(20, 500),
            "lifetime_value": np.random.uniform(0, 10000)
        },
        "engagement": {
            "email_open_rate": np.random.uniform(0, 1),
            "click_through_rate": np.random.uniform(0, 0.3),
            "last_interaction_days": np.random.randint(0, 365)
        }
    }
    for i in range(100)
]
```

## Run Segmentation

```python
# Call segmentation API
response = requests.post(
    f"{API_BASE}/segmentation",
    json={
        "customers": customers,
        "num_segments": 5,
        "algorithm": "kmeans"
    }
)

segmentation_result = response.json()
print(f"Created {len(segmentation_result['segments'])} segments")
```

## Analyze Segments

```python
# Convert to DataFrame
segments_df = pd.DataFrame([
    {
        "segment_id": seg["segment_id"],
        "name": seg["name"],
        "size": seg["size"],
        **seg["characteristics"]
    }
    for seg in segmentation_result["segments"]
])

print(segments_df)
```

## Visualize Segments

```python
# Plot segment sizes
plt.figure(figsize=(10, 6))
plt.bar(segments_df["name"], segments_df["size"])
plt.xlabel("Segment")
plt.ylabel("Number of Customers")
plt.title("Customer Segment Distribution")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
```

## Next Steps

1. Generate personalized messages for each segment
2. Run A/B tests to compare message variants
3. Monitor safety scores
4. Analyze experiment results
