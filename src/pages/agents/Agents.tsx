import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAgents } from '../../hooks/useAgents';
import AgentModal from '../../features/agents/AgentModal';
import { Agent } from '../../types';

export default function Agents() {
  const { t } = useTranslation();
  const { agents, isLoading, createAgent, updateAgent, deleteAgent, isCreating, isUpdating } = useAgents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [taskTypeFilter, setTaskTypeFilter] = useState('');

  const filteredAgents = agents?.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTaskType = taskTypeFilter === '' || agent.taskType === taskTypeFilter;
    return matchesSearch && matchesTaskType;
  }) || [];

  const handleCreateAgent = () => {
    setSelectedAgent(null);
    setIsModalOpen(true);
  };

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleDeleteAgent = (agentId: number) => {
    if (window.confirm(t('agents.deleteConfirm'))) {
      deleteAgent(agentId);
    }
  };

  const handleSubmit = (data: Partial<Agent>) => {
    if (selectedAgent) {
      updateAgent({ id: selectedAgent.id, agent: data });
    } else {
      createAgent(data as Omit<Agent, 'id'>);
    }
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t('agents.title')}</h3>
          <p className="mt-1 text-sm text-gray-500">{t('agents.description')}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleCreateAgent}
            className="btn btn-primary"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            {t('agents.createAgent')}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('agents.filterByName')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <select
            value={taskTypeFilter}
            onChange={(e) => setTaskTypeFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            <option value="">{t('agents.filterByTaskType')}</option>
            <option value="customer-support">Customer Support</option>
            <option value="data-analysis">Data Analysis</option>
            <option value="content-generation">Content Generation</option>
          </select>
        </div>
      </div>

      {/* Agents Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredAgents.map((agent) => (
            <li key={agent.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium">
                          {agent.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{agent.name}</div>
                      <div className="text-sm text-gray-500">{agent.taskType}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      agent.status === 'active' ? 'bg-green-100 text-green-800' :
                      agent.status === 'idle' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {t(`dashboard.status.${agent.status}`)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAgent(agent)}
                        className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                      >
                        {t('agents.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteAgent(agent.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        {t('agents.delete')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      <AgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedAgent || undefined}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
} 