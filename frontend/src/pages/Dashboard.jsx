import { useEffect, useState } from 'react'
import Card from '../components/Card'
import { UsersIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, BeakerIcon } from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [stats, setStats] = useState([
    { name: 'Total Segments', value: '8', icon: UsersIcon, change: '+12%', changeType: 'positive' },
    { name: 'Active Variants', value: '24', icon: ChatBubbleLeftRightIcon, change: '+5%', changeType: 'positive' },
    { name: 'Safety Score', value: '98%', icon: ShieldCheckIcon, change: '+2%', changeType: 'positive' },
    { name: 'Running Experiments', value: '3', icon: BeakerIcon, change: '0%', changeType: 'neutral' },
  ])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to Customer Personalization Orchestrator</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Segments">
          <div className="space-y-4">
            {[
              { name: 'High-Value Customers', size: 1250, growth: '+15%' },
              { name: 'New Subscribers', size: 890, growth: '+32%' },
              { name: 'Churned Users', size: 145, growth: '-8%' },
            ].map((segment) => (
              <div key={segment.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{segment.name}</p>
                  <p className="text-sm text-gray-500">{segment.size} customers</p>
                </div>
                <span className={`text-sm font-semibold ${
                  segment.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {segment.growth}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top Performing Variants">
          <div className="space-y-4">
            {[
              { name: 'Exclusive Offer', ctr: 8.5, conversion: 3.2 },
              { name: 'Personalized Recommendations', ctr: 7.2, conversion: 2.8 },
              { name: 'Limited Time Sale', ctr: 6.8, conversion: 2.5 },
            ].map((variant) => (
              <div key={variant.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{variant.name}</p>
                  <p className="text-sm text-gray-500">CTR: {variant.ctr}% | Conv: {variant.conversion}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
