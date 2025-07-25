import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { AgentPerformance } from '../../types';

interface PerformanceMetricsProps {
  data: AgentPerformance[];
  isLoading: boolean;
}

export default function PerformanceMetrics({ data, isLoading }: PerformanceMetricsProps) {
  const { t } = useTranslation();
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">{t('common.loading')}</div>
      </div>
    );
  }

  const selectedAgentData = selectedAgent
    ? data.find(agent => agent.agentId === selectedAgent)
    : null;

  return (
    <div className="space-y-6">
      {/* Agent Selection */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">
          {t('metrics.title')}
        </h2>
        <select
          value={selectedAgent || ''}
          onChange={(e) => setSelectedAgent(e.target.value ? Number(e.target.value) : null)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">{t('metrics.selectAgent')}</option>
          {data.map((agent) => (
            <option key={agent.agentId} value={agent.agentId}>
              {agent.agentName}
            </option>
          ))}
        </select>
      </div>

      {selectedAgentData && (
        <div className="space-y-8">
          {/* Success Rate Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('metrics.taskSuccessRate')}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedAgentData.metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, t('metrics.successRate')]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="taskSuccessRate"
                    stroke="#4F46E5"
                    name={t('metrics.successRate')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Response Time Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('metrics.averageResponseTime')}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedAgentData.metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis
                    tickFormatter={(value) => `${value}s`}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value.toFixed(1)}s`, t('metrics.responseTime')]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="averageResponseTime"
                    stroke="#10B981"
                    name={t('metrics.responseTime')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tasks Handled Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {t('metrics.tasksHandled')}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={selectedAgentData.metrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [value, t('metrics.tasks')]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Legend />
                  <Bar
                    dataKey="tasksHandled"
                    fill="#6366F1"
                    name={t('metrics.tasks')}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 