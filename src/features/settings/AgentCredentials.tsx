import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { AgentCredentials } from '../../types';

interface AgentCredentialsProps {
  credentials: AgentCredentials;
  onUpdate: (credentials: AgentCredentials) => void;
}

export default function AgentCredentialsComponent({ credentials, onUpdate }: AgentCredentialsProps) {
  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showAnthropic, setShowAnthropic] = useState(false);
  const [showMistral, setShowMistral] = useState(false);

  const handleUpdate = (provider: keyof AgentCredentials['credentials'], value: string) => {
    onUpdate({
      ...credentials,
      credentials: {
        ...credentials.credentials,
        [provider]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">OpenAI API Key</h3>
        <div className="mt-1 relative">
          <input
            type={showOpenAI ? 'text' : 'password'}
            value={credentials.credentials.openai || ''}
            onChange={(e) => handleUpdate('openai', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pr-10"
            placeholder="sk-..."
          />
          <button
            type="button"
            onClick={() => setShowOpenAI(!showOpenAI)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showOpenAI ? (
              <EyeSlashIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Anthropic API Key</h3>
        <div className="mt-1 relative">
          <input
            type={showAnthropic ? 'text' : 'password'}
            value={credentials.credentials.anthropic || ''}
            onChange={(e) => handleUpdate('anthropic', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pr-10"
            placeholder="sk-ant-..."
          />
          <button
            type="button"
            onClick={() => setShowAnthropic(!showAnthropic)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showAnthropic ? (
              <EyeSlashIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Mistral API Key</h3>
        <div className="mt-1 relative">
          <input
            type={showMistral ? 'text' : 'password'}
            value={credentials.credentials.mistral || ''}
            onChange={(e) => handleUpdate('mistral', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm pr-10"
            placeholder="..."
          />
          <button
            type="button"
            onClick={() => setShowMistral(!showMistral)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showMistral ? (
              <EyeSlashIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 