import { useTranslation } from 'react-i18next';
import PromptList from '../../features/prompts/PromptList';

export default function Prompts() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">{t('prompts.title')}</h1>
          <p className="mt-2 text-sm text-gray-700">{t('prompts.description')}</p>
        </div>
      </div>
      <PromptList />
    </div>
  );
} 