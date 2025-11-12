import { useState } from 'react'
import Card from '../components/Card'
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  TrophyIcon 
} from '@heroicons/react/24/outline'

export default function Experiments() {
  const [experiments, setExperiments] = useState([
    {
      id: 'exp_1',
      name: 'Subject Line Test',
      type: 'A/B',
      status: 'running',
      startDate: '2024-01-10',
      endDate: '2024-01-24',
      variants: [
        { id: 'var_a', name: 'Control', impressions: 10000, clicks: 500, conversions: 150 },
        { id: 'var_b', name: 'Variant B', impressions: 10000, clicks: 650, conversions: 195 },
      ],
      winner: 'var_b',
      confidence: 0.95
    },
    {
      id: 'exp_2',
      name: 'Personalization Level Test',
      type: 'A/B/n',
      status: 'running',
      startDate: '2024-01-12',
      endDate: '2024-01-26',
      variants: [
        { id: 'var_a', name: 'Low', impressions: 7500, clicks: 300, conversions: 75 },
        { id: 'var_b', name: 'Medium', impressions: 7500, clicks: 450, conversions: 135 },
        { id: 'var_c', name: 'High', impressions: 7500, clicks: 525, conversions: 158 },
      ],
      winner: 'var_c',
      confidence: 0.92
    },
    {
      id: 'exp_3',
      name: 'CTA Button Test',
      type: 'A/B',
      status: 'completed',
      startDate: '2024-01-05',
      endDate: '2024-01-19',
      variants: [
        { id: 'var_a', name: 'Shop Now', impressions: 15000, clicks: 750, conversions: 225 },
        { id: 'var_b', name: 'Get Started', impressions: 15000, clicks: 825, conversions: 248 },
      ],
      winner: 'var_b',
      confidence: 0.98
    },
  ])

  const calculateCTR = (clicks, impressions) => {
    return ((clicks / impressions) * 100).toFixed(2)
  }

  const calculateConversion = (conversions, clicks) => {
    return ((conversions / clicks) * 100).toFixed(2)
  }

  const getStatusColor = (status) => {
    return status === 'running' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Experiments</h1>
          <p className="mt-2 text-gray-600">A/B/n testing and experimentation</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Create Experiment
        </button>
      </div>

      <div className="space-y-6">
        {experiments.map((exp) => (
          <Card key={exp.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${getStatusColor(exp.status)}`}>
                    {exp.status}
                  </span>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                    {exp.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {exp.startDate} → {exp.endDate}
                </p>
              </div>
              {exp.winner && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">Confidence</p>
                  <p className="text-2xl font-bold text-primary-600">
                    {(exp.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {exp.variants.map((variant) => {
                const ctr = calculateCTR(variant.clicks, variant.impressions)
                const convRate = calculateConversion(variant.conversions, variant.clicks)
                const isWinner = exp.winner === variant.id

                return (
                  <div 
                    key={variant.id} 
                    className={`p-4 rounded-lg border-2 ${
                      isWinner ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{variant.name}</h4>
                        {isWinner && (
                          <TrophyIcon className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Impressions</p>
                        <p className="font-semibold">{variant.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Clicks</p>
                        <p className="font-semibold">{variant.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">CTR</p>
                        <p className="font-semibold text-primary-600">{ctr}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conversions</p>
                        <p className="font-semibold">{variant.conversions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Conv. Rate</p>
                        <p className="font-semibold text-green-600">{convRate}%</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                View Details
              </button>
              {exp.status === 'running' && (
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Stop Experiment
                </button>
              )}
              {exp.winner && (
                <button className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700">
                  Deploy Winner
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
