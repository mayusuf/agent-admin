import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Prompt } from '../../types';

const promptSchema = z.object({
  text: z.string().min(1, 'Prompt text is required'),
  modelVersion: z.string().min(1, 'Model version is required'),
});

type PromptFormData = z.infer<typeof promptSchema>;

interface PromptFormProps {
  initialData?: Prompt;
  onSubmit: (data: Partial<Prompt>) => void;
  isLoading?: boolean;
}

export default function PromptForm({
  initialData,
  onSubmit,
  isLoading = false,
}: PromptFormProps) {
  const isEditMode = !!initialData?.id;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        >
          Prompt Text
        </label>
        <textarea
          id="text"
          rows={4}
          placeholder="Enter your prompt text here..."
          {...register('text')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-600">{errors.text.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="modelVersion"
          className="block text-sm font-medium text-gray-700"
        >
          Model Version
        </label>
        <select
          id="modelVersion"
          {...register('modelVersion')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="">Select model version</option>
          <option value="gpt-4">GPT-4</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3-opus">Claude-3 Opus</option>
          <option value="claude-3-sonnet">Claude-3 Sonnet</option>
          <option value="claude-3-haiku">Claude-3 Haiku</option>
          <option value="mistral-large">Mistral Large</option>
          <option value="mistral-medium">Mistral Medium</option>
        </select>
        {errors.modelVersion && (
          <p className="mt-1 text-sm text-red-600">
            {errors.modelVersion.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary"
        >
          {isLoading ? 'Saving...' : (isEditMode ? 'Update Prompt' : 'Create Prompt')}
        </button>
      </div>
    </form>
  );
} 