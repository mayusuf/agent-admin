import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings } from '../../types';

interface LLMSettingsProps {
  settings: Settings;
  onUpdate: (settings: Partial<Settings>) => void;
  isLoading: boolean;
}

export default function LLMSettings({ settings, onUpdate, isLoading }: LLMSettingsProps) {
  const { t } = useTranslation();

  const handleDefaultLLMChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ defaultLLM: e.target.value as Settings['defaultLLM'] });
  };

  const handleModelVersionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ defaultModelVersion: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="defaultLLM"
          className="block text-sm font-medium text-gray-700"
        >
          {t('settings.defaultLLM')}
        </label>
        <select
          id="defaultLLM"
          value={settings.defaultLLM}
          onChange={handleDefaultLLMChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          disabled={isLoading}
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="mistral">Mistral</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="modelVersion"
          className="block text-sm font-medium text-gray-700"
        >
          {t('settings.defaultModelVersion')}
        </label>
        <input
          type="text"
          id="modelVersion"
          value={settings.defaultModelVersion}
          onChange={handleModelVersionChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          {t('settings.llmCredentials')}
        </h3>
        {settings.credentials.map((credential) => (
          <div
            key={credential.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {credential.provider.charAt(0).toUpperCase() + credential.provider.slice(1)}
              </h4>
              <p className="text-sm text-gray-500">
                {credential.modelVersion}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  credential.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {credential.isActive ? t('settings.active') : t('settings.inactive')}
              </span>
              <button
                type="button"
                className="text-primary-600 hover:text-primary-900"
                onClick={() => {
                  const updatedCredentials = settings.credentials.map(c =>
                    c.id === credential.id
                      ? { ...c, isActive: !c.isActive }
                      : c
                  );
                  onUpdate({ credentials: updatedCredentials });
                }}
                disabled={isLoading}
              >
                {credential.isActive ? t('settings.deactivate') : t('settings.activate')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 