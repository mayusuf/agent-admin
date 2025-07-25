import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Agent } from '../types';

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
  const { t } = useTranslation();
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
          {t('dashboard.agents.name')}
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="taskType" className="block text-sm font-medium text-gray-700">
          {t('dashboard.agents.taskType')}
        </label>
        <input
          type="text"
          id="taskType"
          {...register('taskType')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        {errors.taskType && (
          <p className="mt-1 text-sm text-red-600">{errors.taskType.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          {t('dashboard.agents.status')}
        </label>
        <select
          id="status"
          {...register('status')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="active">{t('dashboard.status.active')}</option>
          <option value="idle">{t('dashboard.status.idle')}</option>
          <option value="failed">{t('dashboard.status.failed')}</option>
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
          {isLoading ? t('common.loading') : t('common.save')}
        </button>
      </div>
    </form>
  );
} 