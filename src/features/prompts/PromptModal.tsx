import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PromptForm from './PromptForm';
import { Prompt } from '../../types';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Prompt>) => void;
  initialData?: Prompt;
  isLoading: boolean;
}

export default function PromptModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: PromptModalProps) {
  const isEditMode = !!initialData?.id;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {isEditMode ? 'Edit Prompt' : 'Add New Prompt'}
            </Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <PromptForm
            initialData={initialData}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Dialog>
  );
} 