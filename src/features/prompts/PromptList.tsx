import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePrompts } from '../../hooks/usePrompts';
import PromptModal from './PromptModal';
import { Prompt } from '../../types';

export default function PromptList() {
  const { t } = useTranslation();
  // Default to agent ID 1 for now
  const { prompts, createPrompt, updatePrompt, deletePrompt, isCreating, isUpdating } = usePrompts(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrompts = prompts?.filter((prompt) => 
    prompt.text.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreatePrompt = () => {
    setSelectedPrompt(null);
    setIsModalOpen(true);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleDeletePrompt = (promptId: number) => {
    if (window.confirm(t('prompts.deleteConfirm'))) {
      deletePrompt(promptId);
    }
  };

  const handleSubmit = (data: Partial<Prompt>) => {
    if (selectedPrompt) {
      updatePrompt({ id: selectedPrompt.id, prompt: data });
    } else {
      createPrompt(data as Omit<Prompt, 'id'>);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t('prompts.title')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('prompts.description')}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleCreatePrompt}
            className="btn btn-primary"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            {t('prompts.createPrompt')}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('prompts.filterByContent')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Prompts Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredPrompts.map((prompt) => (
            <li key={prompt.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {prompt.text.substring(0, 100)}...
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Model: {prompt.modelVersion} | Agent ID: {prompt.agentId}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditPrompt(prompt)}
                      className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                    >
                      {t('prompts.edit')}
                    </button>
                    <button
                      onClick={() => handleDeletePrompt(prompt.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      {t('prompts.delete')}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <PromptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedPrompt || undefined}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
} 