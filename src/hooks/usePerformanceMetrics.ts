import { useQuery } from '@tanstack/react-query';
import { AgentPerformance, PerformanceMetrics } from '../types';

// Mock data for demonstration
const mockMetrics: PerformanceMetrics[] = [
  {
    id: 1,
    agentId: 1,
    taskSuccessRate: 0.95,
    averageResponseTime: 1.2,
    tasksHandled: 150,
    timestamp: '2024-03-20T10:00:00Z'
  },
  {
    id: 2,
    agentId: 1,
    taskSuccessRate: 0.92,
    averageResponseTime: 1.3,
    tasksHandled: 180,
    timestamp: '2024-03-21T10:00:00Z'
  },
  {
    id: 3,
    agentId: 2,
    taskSuccessRate: 0.88,
    averageResponseTime: 1.5,
    tasksHandled: 120,
    timestamp: '2024-03-20T10:00:00Z'
  },
  {
    id: 4,
    agentId: 2,
    taskSuccessRate: 0.90,
    averageResponseTime: 1.4,
    tasksHandled: 140,
    timestamp: '2024-03-21T10:00:00Z'
  }
];

const mockAgents = [
  { id: 1, name: 'Customer Support Agent' },
  { id: 2, name: 'Data Analysis Agent' }
];

export function usePerformanceMetrics() {
  const { data: metrics, isLoading } = useQuery<AgentPerformance[]>({
    queryKey: ['performanceMetrics'],
    queryFn: async () => {
      // In a real application, this would be an API call
      // For now, we'll use mock data
      return mockAgents.map(agent => ({
        agentId: agent.id,
        agentName: agent.name,
        metrics: mockMetrics.filter(m => m.agentId === agent.id)
      }));
    }
  });

  return {
    metrics,
    isLoading
  };
} 