import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import KPICards from '../components/dashboard/KPICards';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import CampaignTable from '../components/dashboard/CampaignTable';
import DateRangePicker from '../components/dashboard/DateRangePicker';
import { useCampaignData } from '../hooks/useCampaignData';

const Dashboard = () => {
  const { campaigns, loading, getKPIs } = useCampaignData();
  const [filteredData, setFilteredData] = useState([]);
  const kpis = getKPIs();

  useEffect(() => {
    if (campaigns.length > 0) {
      // Flatten daily data for all campaigns
      const allDailyData = campaigns.flatMap(campaign => 
        campaign.dailyData.map(day => ({
          ...day,
          campaignName: campaign.name
        }))
      );
      setFilteredData(allDailyData);
    }
  }, [campaigns]);

  const handleDateRangeChange = ({ start, end }) => {
    // Filter data based on date range
    const filtered = campaigns.flatMap(campaign =>
      campaign.dailyData.filter(day => {
        const date = new Date(day.date);
        return date >= start && date <= end;
      })
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading campaign data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <DateRangePicker onRangeChange={handleDateRangeChange} />
        <KPICards kpis={kpis} />
        <PerformanceChart data={filteredData} />
        <CampaignTable campaigns={campaigns} />
      </div>
    </Layout>
  );
};

export default Dashboard;