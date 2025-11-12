import { useState } from 'react'
import Card from '../components/Card'
import { segmentationAPI } from '../services/api'

export default function Segments() {
  const [segments, setSegments] = useState([
    {
      id: 'seg_0',
      name: 'High-Value Customers',
      size: 1250,
      avgAge: 42,
      avgIncome: 95000,
      avgLtv: 5400,
      description: 'Premium customers with high lifetime value'
    },
    {
      id: 'seg_1',
      name: 'New Subscribers',
      size: 890,
      avgAge: 28,
      avgIncome: 52000,
      avgLtv: 450,
      description: 'Recently joined customers with growth potential'
    },
    {
      id: 'seg_2',
      name: 'Active Engagers',
      size: 2100,
      avgAge: 35,
      avgIncome: 68000,
      avgLtv: 2100,
      description: 'Highly engaged customers with regular interaction'
    },
  ])

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Segments</h1>
          <p className="mt-2 text-gray-600">AI-powered customer segmentation</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Create Segment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {segments.map((segment) => (
          <Card key={segment.id}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{segment.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{segment.description}</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Size:</span>
                <span className="font-medium">{segment.size.toLocaleString()} customers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Age:</span>
                <span className="font-medium">{segment.avgAge} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Income:</span>
                <span className="font-medium">${segment.avgIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg LTV:</span>
                <span className="font-medium">${segment.avgLtv.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                View Details
              </button>
              <button className="flex-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
                Generate Messages
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
