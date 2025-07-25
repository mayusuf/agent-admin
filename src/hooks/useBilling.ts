import { useQuery } from '@tanstack/react-query';
import type { BillingMetric } from '../types';

// Mock data for development
const mockBillingMetrics: BillingMetric[] = [
  {
    date: '2024-03-15',
    tokens: 1500,
    cost: 0.003,
    agentId: 1,
  },
  {
    date: '2024-03-15',
    tokens: 2300,
    cost: 0.0046,
    agentId: 2,
  },
  {
    date: '2024-03-16',
    tokens: 1800,
    cost: 0.0036,
    agentId: 1,
  },
  {
    date: '2024-03-16',
    tokens: 3100,
    cost: 0.0062,
    agentId: 2,
  },
  {
    date: '2024-03-17',
    tokens: 2100,
    cost: 0.0042,
    agentId: 1,
  },
  {
    date: '2024-03-17',
    tokens: 2800,
    cost: 0.0056,
    agentId: 2,
  },
];

export function useBilling() {
  const { data: metrics = [], isLoading } = useQuery({
    queryKey: ['billing'],
    queryFn: async () => {
      // In a real app, this would be an API call
      return mockBillingMetrics;
    },
  });

  return {
    metrics,
    isLoading,
  };
} 