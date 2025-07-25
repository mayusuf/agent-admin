import React from 'react';
import { useTranslation } from 'react-i18next';
import { Settings } from '../../types';

interface APISettingsProps {
  settings: Settings;
  onUpdate: (settings: Partial<Settings>) => void;
  isLoading: boolean;
}

export default function APISettings({ settings, onUpdate, isLoading }: APISettingsProps) {
  const { t } = useTranslation();

  const handleLangChainKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ langChainApiKey: e.target.value });
  };

  const handleLangSmithKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ langSmithApiKey: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="langChainKey"
          className="block text-sm font-medium text-gray-700"
        >
          {t('settings.langChainApiKey')}
        </label>
        <input
          type="password"
          id="langChainKey"
          value={settings.langChainApiKey || ''}
          onChange={handleLangChainKeyChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          disabled={isLoading}
        />
        <p className="mt-2 text-sm text-gray-500">
          {t('settings.langChainApiKeyDescription')}
        </p>
      </div>

      <div>
        <label
          htmlFor="langSmithKey"
          className="block text-sm font-medium text-gray-700"
        >
          {t('settings.langSmithApiKey')}
        </label>
        <input
          type="password"
          id="langSmithKey"
          value={settings.langSmithApiKey || ''}
          onChange={handleLangSmithKeyChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          disabled={isLoading}
        />
        <p className="mt-2 text-sm text-gray-500">
          {t('settings.langSmithApiKeyDescription')}
        </p>
      </div>
    </div>
  );
} 