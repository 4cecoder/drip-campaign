import React, { createContext, useState, useContext, useEffect } from 'react';
import { Stage, Customer, DripCampaign } from '@/lib/campaignTypes';
import { fetchCampaignsWithStages } from '@/lib/campaignUtils';

interface CampaignContextType {
  stages: Stage[];
  setStages: React.Dispatch<React.SetStateAction<Stage[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  campaigns: DripCampaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<DripCampaign[]>>;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [campaigns, setCampaigns] = useState<DripCampaign[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignsWithStages = await fetchCampaignsWithStages();
        setCampaigns(campaignsWithStages);
        setStages(campaignsWithStages.flatMap(campaign => campaign.stages));
      } catch (error) {
        console.error('Error fetching campaigns and stages:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <CampaignContext.Provider value={{ stages, setStages, customers, setCustomers, campaigns, setCampaigns }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaignContext must be used within a CampaignProvider');
  }
  return context;
};