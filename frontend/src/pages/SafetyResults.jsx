import { useState } from 'react'
import Card from '../components/Card'
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function SafetyResults() {
  const [safetyChecks, setSafetyChecks] = useState([
    {
      id: 'check_1',
      contentId: 'var_1',
      contentPreview: 'Exclusive Offer Just for You...',
      timestamp: '2024-01-15 14:30:00',
      overallScore: 0.95,
      isSafe: true,
      checks: {
        toxicity: { passed: true, score: 0.05 },
        bias: { passed: true, score: 0.10 },
        pii: { passed: true, score: 0.00 },
        contentPolicy: { passed: true, score: 0.02 }
      },
      issues: []
    },
    {
      id: 'check_2',
      contentId: 'var_2',
      contentPreview: 'Welcome! Your Journey Starts Here...',
      timestamp: '2024-01-15 14:25:00',
      overallScore: 0.98,
      isSafe: true,
      checks: {
        toxicity: { passed: true, score: 0.02 },
        bias: { passed: true, score: 0.05 },
        pii: { passed: true, score: 0.00 },
        contentPolicy: { passed: true, score: 0.01 }
      },
      issues: []
    },
    {
      id: 'check_3',
      contentId: 'var_3',
      contentPreview: 'Special offer for john.doe@email.com...',
      timestamp: '2024-01-15 14:20:00',
      overallScore: 0.60,
      isSafe: false,
      checks: {
        toxicity: { passed: true, score: 0.08 },
        bias: { passed: true, score: 0.15 },
        pii: { passed: false, score: 0.95 },
        contentPolicy: { passed: true, score: 0.05 }
      },
      issues: [
        {
          type: 'pii',
          severity: 'high',
          description: 'Potential PII detected in content',
          suggestion: 'Remove or redact personal information'
        }
      ]
    },
  ])

  const getSafetyIcon = (isSafe) => {
    if (isSafe) {
      return <CheckCircleIcon className="h-8 w-8 text-green-500" />
    }
    return <XCircleIcon className="h-8 w-8 text-red-500" />
  }

  const getScoreColor = (score) => {
    if (score >= 0.9) return 'text-green-600'
    if (score >= 0.7) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Safety Results</h1>
          <p className="mt-2 text-gray-600">Content safety and moderation checks</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Run New Check
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Checks</p>
              <p className="text-2xl font-bold">{safetyChecks.length}</p>
            </div>
            <CheckCircleIcon className="h-10 w-10 text-primary-600" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Passed</p>
              <p className="text-2xl font-bold text-green-600">
                {safetyChecks.filter(c => c.isSafe).length}
              </p>
            </div>
            <CheckCircleIcon className="h-10 w-10 text-green-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Issues Found</p>
              <p className="text-2xl font-bold text-red-600">
                {safetyChecks.filter(c => !c.isSafe).length}
              </p>
            </div>
            <XCircleIcon className="h-10 w-10 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Safety Check Results */}
      <div className="space-y-4">
        {safetyChecks.map((check) => (
          <Card key={check.id}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getSafetyIcon(check.isSafe)}
                  <div>
                    <h3 className="font-semibold text-gray-900">{check.contentPreview}</h3>
                    <p className="text-sm text-gray-500">{check.timestamp}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-500">Toxicity</p>
                    <p className={`text-sm font-semibold ${check.checks.toxicity.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {check.checks.toxicity.passed ? 'Pass' : 'Fail'} ({check.checks.toxicity.score.toFixed(2)})
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Bias</p>
                    <p className={`text-sm font-semibold ${check.checks.bias.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {check.checks.bias.passed ? 'Pass' : 'Fail'} ({check.checks.bias.score.toFixed(2)})
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">PII</p>
                    <p className={`text-sm font-semibold ${check.checks.pii.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {check.checks.pii.passed ? 'Pass' : 'Fail'} ({check.checks.pii.score.toFixed(2)})
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Content Policy</p>
                    <p className={`text-sm font-semibold ${check.checks.contentPolicy.passed ? 'text-green-600' : 'text-red-600'}`}>
                      {check.checks.contentPolicy.passed ? 'Pass' : 'Fail'} ({check.checks.contentPolicy.score.toFixed(2)})
                    </p>
                  </div>
                </div>

                {check.issues.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                    <div className="flex items-start gap-2">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-red-900">Issues Detected</p>
                        {check.issues.map((issue, idx) => (
                          <div key={idx} className="mt-2">
                            <p className="text-sm text-red-800">{issue.description}</p>
                            <p className="text-sm text-red-600 mt-1">
                              <strong>Suggestion:</strong> {issue.suggestion}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="ml-4 text-right">
                <p className="text-sm text-gray-500">Overall Score</p>
                <p className={`text-3xl font-bold ${getScoreColor(check.overallScore)}`}>
                  {(check.overallScore * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
