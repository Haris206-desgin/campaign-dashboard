import React from 'react';
import { 
  EyeIcon, 
  CursorArrowRaysIcon, 
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  PercentBadgeIcon 
} from '@heroicons/react/24/outline';

const KPICard = ({ title, value, icon: Icon, trend, format = 'number' }) => {
  const formattedValue = format === 'currency' 
    ? `$${value.toLocaleString()}`
    : format === 'percent'
    ? `${value}%`
    : value.toLocaleString();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{formattedValue}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
            </p>
          )}
        </div>
        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  );
};

const KPICards = ({ kpis }) => {
  const cards = [
    { title: 'Impressions', value: kpis.impressions, icon: EyeIcon, format: 'number' },
    { title: 'Clicks', value: kpis.clicks, icon: CursorArrowRaysIcon, format: 'number' },
    { title: 'CTR', value: kpis.ctr, icon: PercentBadgeIcon, format: 'percent' },
    { title: 'Conversions', value: kpis.conversions, icon: ChartBarIcon, format: 'number' },
    { title: 'Spend', value: kpis.spend, icon: CurrencyDollarIcon, format: 'currency' },
    { title: 'ROAS', value: kpis.roas, icon: ArrowTrendingUpIcon, format: 'percent' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {cards.map((card, index) => (
        <KPICard key={index} {...card} />
      ))}
    </div>
  );
};

export default KPICards;