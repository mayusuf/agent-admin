import { useQuery } from '@tanstack/react-query';

export interface Interaction {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  userMessage: string;
  agentResponse: string;
  status: 'success' | 'error';
}

// Mock data for demonstration
const mockInteractions: Interaction[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    agentId: 'agent1',
    agentName: 'Customer Support Agent',
    userMessage: 'How do I reset my password?',
    agentResponse: 'To reset your password, please visit the login page and click on "Forgot Password".',
    status: 'success',
  },
  {
    id: '2',
    timestamp: new Date().toISOString(),
    agentId: 'agent2',
    agentName: 'Technical Support Agent',
    userMessage: 'My application is crashing',
    agentResponse: 'I apologize, but I was unable to process your request due to a technical error.',
    status: 'error',
  },
];

export function useInteractions() {
  const { data: interactions, isLoading } = useQuery<Interaction[]>({
    queryKey: ['interactions'],
    queryFn: async () => {
      // In a real application, this would be an API call
      return mockInteractions;
    },
  });

  return {
    interactions,
    isLoading,
  };
} 