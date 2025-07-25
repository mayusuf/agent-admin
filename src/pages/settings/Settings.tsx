import { useTranslation } from 'react-i18next';
import SettingsPanel from '../../features/settings/Settings';

export default function Settings() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('settings.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('settings.description')}
          </p>
        </div>
      </div>

      <SettingsPanel />
    </div>
  );
} 