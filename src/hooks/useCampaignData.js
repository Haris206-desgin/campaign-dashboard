import { useState, useEffect } from 'react';
import mockData from '../data/mockData.json';

export const useCampaignData = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCampaigns(mockData.campaigns);
      setLoading(false);
    }, 500);
  }, []);

  const getKPIs = () => {
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
    
    return {
      impressions: totalImpressions,
      clicks: totalClicks,
      ctr: ((totalClicks / totalImpressions) * 100).toFixed(2),
      conversions: totalConversions,
      spend: totalSpend,
      roas: ((totalConversions * 100) / totalSpend).toFixed(2)
    };
  };

  return { campaigns, loading, getKPIs };
};