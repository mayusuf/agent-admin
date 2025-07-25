import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Agent } from '../types';

export function useAgents() {
  const queryClient = useQueryClient();

  const { data: agents = [], isLoading, error } = useQuery({
    queryKey: ['agents'],
    queryFn: api.getAgents,
  });

  const createAgent = useMutation({
    mutationFn: api.createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const updateAgent = useMutation({
    mutationFn: ({ id, agent }: { id: number; agent: Partial<Agent> }) =>
      api.updateAgent(id, agent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  const deleteAgent = useMutation({
    mutationFn: api.deleteAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
  });

  return {
    agents,
    isLoading,
    error,
    createAgent: createAgent.mutate,
    updateAgent: updateAgent.mutate,
    deleteAgent: deleteAgent.mutate,
    isCreating: createAgent.isPending,
    isUpdating: updateAgent.isPending,
    isDeleting: deleteAgent.isPending,
  };
} 