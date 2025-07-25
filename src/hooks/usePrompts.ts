import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Prompt } from '../types';

// Mock data for development
const mockPrompts: Prompt[] = [
  {
    id: 1,
    agentId: 1,
    text: 'You are a helpful assistant that specializes in customer support.',
    modelVersion: 'gpt-4',
    createdAt: '2024-03-20T10:00:00Z',
  },
  {
    id: 2,
    agentId: 1,
    text: 'You are a data analyst that helps with data visualization.',
    modelVersion: 'gpt-3.5-turbo',
    createdAt: '2024-03-20T11:00:00Z',
  },
];

export function usePrompts(agentId: number) {
  const queryClient = useQueryClient();

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ['prompts', agentId],
    queryFn: async () => {
      // In a real application, this would be an API call
      return mockPrompts.filter(prompt => prompt.agentId === agentId);
    },
  });

  const createPromptMutation = useMutation({
    mutationFn: async (newPrompt: Partial<Prompt>) => {
      // In a real application, this would be an API call
      const prompt: Prompt = {
        id: Math.max(...mockPrompts.map(p => p.id)) + 1,
        agentId,
        text: newPrompt.text || '',
        modelVersion: newPrompt.modelVersion || '',
        createdAt: new Date().toISOString(),
      };
      mockPrompts.push(prompt);
      return prompt;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts', agentId] });
    },
  });

  const updatePromptMutation = useMutation({
    mutationFn: async ({ id, prompt }: { id: number; prompt: Partial<Prompt> }) => {
      // In a real application, this would be an API call
      const index = mockPrompts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockPrompts[index] = { ...mockPrompts[index], ...prompt };
        return mockPrompts[index];
      }
      throw new Error('Prompt not found');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts', agentId] });
    },
  });

  const deletePromptMutation = useMutation({
    mutationFn: async (id: number) => {
      // In a real application, this would be an API call
      const index = mockPrompts.findIndex(p => p.id === id);
      if (index !== -1) {
        mockPrompts.splice(index, 1);
        return id;
      }
      throw new Error('Prompt not found');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts', agentId] });
    },
  });

  return {
    prompts,
    isLoading,
    createPrompt: createPromptMutation.mutate,
    updatePrompt: updatePromptMutation.mutate,
    deletePrompt: deletePromptMutation.mutate,
    isCreating: createPromptMutation.isPending,
    isUpdating: updatePromptMutation.isPending,
    isDeleting: deletePromptMutation.isPending,
  };
} 