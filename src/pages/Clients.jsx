import React from 'react';
import Layout from '../components/layout/Layout';
import { useCampaignData } from '../hooks/useCampaignData';

const Clients = () => {
  const { campaigns, loading } = useCampaignData();

  // Get unique clients
  const clients = [...new Map(campaigns.map(campaign => [campaign.client, campaign])).values()];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading clients...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Clients</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your client relationships</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{client.client}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Campaigns: 1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spend: ${client.spend.toLocaleString()}</p>
              {/* <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                View Details →
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Clients;