import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../hooks/useSettings';
import AgentCredentialsComponent from './AgentCredentials';
import { Settings as SettingsType, AgentCredentials } from '../../types';

export default function Settings() {
  const { t } = useTranslation();
  const { settings, updateSettings, isLoading } = useSettings();
  const [activeTab, setActiveTab] = useState('general');

  const handleGeneralUpdate = (field: keyof SettingsType, value: string) => {
    updateSettings.mutate({ [field]: value });
  };

  const handleCredentialUpdate = (credentials: AgentCredentials) => {
    const updatedCredentials = settings?.agentCredentials?.map(ac =>
      ac.id === credentials.id ? credentials : ac
    ) || [credentials];
    updateSettings.mutate({ agentCredentials: updatedCredentials });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">{t('common.loading')}</div>
      </div>
    );
  }

  const currentSettings = settings || {
    defaultLLM: 'openai',
    defaultModelVersion: 'gpt-4',
    credentials: [],
    agentCredentials: []
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{t('settings.title')}</h3>
        <p className="mt-1 text-sm text-gray-500">{t('settings.description')}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'general'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('settings.general')}
          </button>
          <button
            onClick={() => setActiveTab('credentials')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'credentials'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {t('settings.credentials')}
          </button>
        </nav>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div>
            <label htmlFor="defaultLLM" className="block text-sm font-medium text-gray-700">
              {t('settings.defaultLLM')}
            </label>
            <select
              id="defaultLLM"
              value={currentSettings.defaultLLM}
              onChange={(e) => handleGeneralUpdate('defaultLLM', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="mistral">Mistral</option>
            </select>
          </div>

          <div>
            <label htmlFor="defaultModelVersion" className="block text-sm font-medium text-gray-700">
              {t('settings.defaultModelVersion')}
            </label>
            <input
              type="text"
              id="defaultModelVersion"
              value={currentSettings.defaultModelVersion}
              onChange={(e) => handleGeneralUpdate('defaultModelVersion', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="gpt-4"
            />
          </div>

          <div>
            <label htmlFor="langChainApiKey" className="block text-sm font-medium text-gray-700">
              {t('settings.langChainApiKey')}
            </label>
            <input
              type="password"
              id="langChainApiKey"
              value={currentSettings.langChainApiKey || ''}
              onChange={(e) => handleGeneralUpdate('langChainApiKey', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="..."
            />
          </div>

          <div>
            <label htmlFor="langSmithApiKey" className="block text-sm font-medium text-gray-700">
              {t('settings.langSmithApiKey')}
            </label>
            <input
              type="password"
              id="langSmithApiKey"
              value={currentSettings.langSmithApiKey || ''}
              onChange={(e) => handleGeneralUpdate('langSmithApiKey', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              placeholder="..."
            />
          </div>
        </div>
      )}

      {/* Credentials Settings */}
      {activeTab === 'credentials' && (
        <div className="space-y-6">
          {currentSettings.agentCredentials?.map((credential) => (
            <div key={credential.id} className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-md font-medium text-gray-900 mb-4">
                Agent {credential.agentId} Credentials
              </h4>
              <AgentCredentialsComponent
                credentials={credential}
                onUpdate={handleCredentialUpdate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 