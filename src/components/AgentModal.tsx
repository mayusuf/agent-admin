import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AgentForm from './AgentForm';
import { Agent } from '../types';
import { useTranslation } from 'react-i18next';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Agent>) => void;
  initialData?: Partial<Agent>;
  isLoading?: boolean;
}

export default function AgentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: AgentModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {initialData ? t('dashboard.agents.edit') : t('dashboard.agents.addAgent')}
            </Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-4">
            <AgentForm
              initialData={initialData}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 