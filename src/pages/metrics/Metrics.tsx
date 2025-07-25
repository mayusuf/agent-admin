import { useTranslation } from 'react-i18next';
import { usePerformanceMetrics } from '../../hooks/usePerformanceMetrics';
import PerformanceMetrics from '../../features/metrics/PerformanceMetrics';

export default function Metrics() {
  const { t } = useTranslation();
  const { metrics, isLoading } = usePerformanceMetrics();

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('metrics.title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('metrics.description')}
          </p>
        </div>
      </div>

      <PerformanceMetrics
        data={metrics || []}
        isLoading={isLoading}
      />
    </div>
  );
} 