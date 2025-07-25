import { useQuery } from '@tanstack/react-query';

export interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

// Mock data for demonstration
const mockLogs: Log[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    level: 'info',
    message: 'Agent initialized successfully',
  },
  {
    id: '2',
    timestamp: new Date().toISOString(),
    level: 'warning',
    message: 'High memory usage detected',
  },
  {
    id: '3',
    timestamp: new Date().toISOString(),
    level: 'error',
    message: 'Failed to connect to OpenAI API',
  },
];

export function useLogs() {
  const { data: logs, isLoading } = useQuery<Log[]>({
    queryKey: ['logs'],
    queryFn: async () => {
      // In a real application, this would be an API call
      return mockLogs;
    },
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  return {
    logs,
    isLoading,
  };
} 