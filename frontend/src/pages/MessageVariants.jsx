import { useState } from 'react'
import Card from '../components/Card'
import { generationAPI } from '../services/api'

export default function MessageVariants() {
  const [variants, setVariants] = useState([
    {
      id: 'var_1',
      segmentId: 'seg_0',
      segmentName: 'High-Value Customers',
      subject: 'Exclusive Offer Just for You',
      content: "Hi there! We noticed you've been eyeing our premium collection. Here's a special 20% discount just for valued customers like you.",
      confidence: 0.85,
      performance: { impressions: 10000, clicks: 850, conversions: 320 }
    },
    {
      id: 'var_2',
      segmentId: 'seg_1',
      segmentName: 'New Subscribers',
      subject: 'Welcome! Your Journey Starts Here',
      content: "Welcome aboard! We're excited to have you join our community. Here's a starter guide and a welcome gift to get you started.",
      confidence: 0.92,
      performance: { impressions: 8900, clicks: 712, conversions: 267 }
    },
    {
      id: 'var_3',
      segmentId: 'seg_2',
      segmentName: 'Active Engagers',
      subject: 'Your Personalized Recommendations',
      content: "Based on your recent activity, we've curated a special selection just for you. Check out these hand-picked items!",
      confidence: 0.88,
      performance: { impressions: 21000, clicks: 1680, conversions: 588 }
    },
  ])

  const calculateCTR = (clicks, impressions) => {
    return ((clicks / impressions) * 100).toFixed(2)
  }

  const calculateConversion = (conversions, clicks) => {
    return ((conversions / clicks) * 100).toFixed(2)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Variants</h1>
          <p className="mt-2 text-gray-600">AI-generated personalized messages</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Generate New Variant
        </button>
      </div>

      <div className="space-y-6">
        {variants.map((variant) => (
          <Card key={variant.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{variant.subject}</h3>
                  <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded">
                    {variant.segmentName}
                  </span>
                </div>
                <p className="text-gray-600">{variant.content}</p>
              </div>
              <div className="ml-4 flex items-center">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Confidence</div>
                  <div className="text-2xl font-bold text-primary-600">
                    {(variant.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 mt-4 pt-4 border-t">
              <div>
                <div className="text-sm text-gray-500">Impressions</div>
                <div className="text-lg font-semibold">{variant.performance.impressions.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Clicks</div>
                <div className="text-lg font-semibold">{variant.performance.clicks.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">CTR</div>
                <div className="text-lg font-semibold text-green-600">
                  {calculateCTR(variant.performance.clicks, variant.performance.impressions)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Conversions</div>
                <div className="text-lg font-semibold">{variant.performance.conversions.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Conv. Rate</div>
                <div className="text-lg font-semibold text-green-600">
                  {calculateConversion(variant.performance.conversions, variant.performance.clicks)}%
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Edit
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Check Safety
              </button>
              <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
                Deploy
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
