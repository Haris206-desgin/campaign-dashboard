import React from 'react';
import Layout from '../components/layout/Layout';
import CampaignTable from '../components/dashboard/CampaignTable';
import { useCampaignData } from '../hooks/useCampaignData';

const Campaigns = () => {
  const { campaigns, loading } = useCampaignData();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading campaigns...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Campaigns</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">View and manage all your advertising campaigns</p>
        </div>
        <CampaignTable campaigns={campaigns} />
      </div>
    </Layout>
  );
};

export default Campaigns;