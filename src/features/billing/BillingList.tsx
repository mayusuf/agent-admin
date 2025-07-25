import { useBilling } from '../../hooks/useBilling';
import { BillingMetric } from '../../types';

export default function BillingList() {
  const { metrics } = useBilling();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {metrics?.map((item: BillingMetric) => (
          <li key={`${item.date}-${item.agentId}`} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-medium">
                      A{item.agentId}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">Agent {item.agentId}</div>
                  <div className="text-sm text-gray-500">{item.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">{item.tokens.toLocaleString()} tokens</span>
                <span className="text-sm font-medium text-gray-900">${item.cost.toFixed(4)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 