import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Settings, LLMCredentials, AgentCredentials } from '../types';

// Mock data for demonstration
const mockSettings: Settings = {
  defaultLLM: 'openai',
  defaultModelVersion: 'gpt-4',
  langChainApiKey: 'lc-123',
  langSmithApiKey: 'ls-456',
  credentials: [
    {
      id: 1,
      provider: 'openai',
      apiKey: 'sk-123',
      modelVersion: 'gpt-4',
      isActive: true
    },
    {
      id: 2,
      provider: 'anthropic',
      apiKey: 'sk-456',
      modelVersion: 'claude-3-opus',
      isActive: false
    }
  ],
  agentCredentials: [
    {
      id: 1,
      agentId: 1,
      credentials: {
        openai: 'sk-789'
      }
    }
  ]
};

export function useSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: async () => {
      // In a real application, this would be an API call
      return mockSettings;
    }
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<Settings>) => {
      // In a real application, this would be an API call
      return { ...settings, ...newSettings };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['settings'], data);
    }
  });

  const updateCredentials = useMutation({
    mutationFn: async (credentials: LLMCredentials) => {
      // In a real application, this would be an API call
      const updatedCredentials = settings?.credentials.map(c => 
        c.id === credentials.id ? credentials : c
      ) || [];
      return { ...settings, credentials: updatedCredentials };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['settings'], data);
    }
  });

  const updateAgentCredentials = useMutation({
    mutationFn: async (agentCredentials: AgentCredentials) => {
      // In a real application, this would be an API call
      const updatedAgentCredentials = settings?.agentCredentials.map(ac => 
        ac.id === agentCredentials.id ? agentCredentials : ac
      ) || [];
      return { ...settings, agentCredentials: updatedAgentCredentials };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['settings'], data);
    }
  });

  return {
    settings,
    isLoading,
    updateSettings,
    updateCredentials,
    updateAgentCredentials
  };
} 