import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Segmentation API
export const segmentationAPI = {
  segmentCustomers: (data) => api.post('/segmentation', data),
  listSegments: () => api.get('/segmentation/segments'),
}

// Retrieval API
export const retrievalAPI = {
  retrieveContext: (data) => api.post('/retrieval', data),
}

// Generation API
export const generationAPI = {
  generateMessages: (data) => api.post('/generation', data),
}

// Safety API
export const safetyAPI = {
  checkSafety: (data) => api.post('/safety', data),
}

// Experiments API
export const experimentsAPI = {
  createExperiment: (data) => api.post('/experiments', data),
  getExperiment: (id) => api.get(`/experiments/${id}`),
}

export default api
