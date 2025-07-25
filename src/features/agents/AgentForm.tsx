import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Agent } from '../../types';

const agentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  taskType: z.string().min(1, 'Task type is required'),
  status: z.enum(['active', 'idle', 'failed']),
});

type AgentFormData = z.infer<typeof agentSchema>;

interface AgentFormProps {
  initialData?: Partial<Agent>;
  onSubmit: (data: AgentFormData) => void;
  isLoading?: boolean;
}

export default function AgentForm({ initialData, onSubmit, isLoading }: AgentFormProps) {
  const isEditMode = !!initialData?.id;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: initialData?.name || '',
      taskType: initialData?.taskType || '',
      status: initialData?.status || 'idle',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Agent Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter agent name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="taskType" className="block text-sm font-medium text-gray-700">
          Task Type
        </label>
        <select
          id="taskType"
          {...register('taskType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="">Select task type</option>
          <option value="customer-support">Customer Support</option>
          <option value="data-analysis">Data Analysis</option>
          <option value="content-generation">Content Generation</option>
          <option value="technical-support">Technical Support</option>
          <option value="sales-support">Sales Support</option>
        </select>
        {errors.taskType && (
          <p className="mt-1 text-sm text-red-600">{errors.taskType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="active">Active</option>
          <option value="idle">Idle</option>
          <option value="failed">Failed</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Saving...' : (isEditMode ? 'Update Agent' : 'Create Agent')}
        </button>
      </div>
    </form>
  );
} 