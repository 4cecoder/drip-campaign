// app/campaigns/campaignUtils.ts

import { Endpoints } from '@/lib/endpoints';
import { del, get, post, put } from '@/lib/api';


export const updateCustomerStage = async (customerId: number, newStage: string): Promise<void> => {
    try {
        await put(Endpoints.updateCustomer(customerId.toString()), { stage: newStage });
    } catch (error) {
        console.error('Error updating customer stage:', error);
        throw error;
    }
};

export const updateCustomerStagePoint = async (customerId: number, newStagePoint: string): Promise<void> => {
    try {
        await put(Endpoints.updateCustomer(customerId.toString()), { stagePoint: newStagePoint });
    } catch (error) {
        console.error('Error updating customer stage point:', error);
        throw error;
    }
};

export const toggleCustomerCampaignStatus = async (campaignCustomerId: number): Promise<void> => {
    try {
        await put(Endpoints.updateCampaignCustomer(campaignCustomerId.toString()), { subscribed: true });
    } catch (error) {
        console.error('Error toggling customer campaign status:', error);
        throw error;
    }
};

export const assignCustomerToCampaign = async (customerId: number, campaignId: number): Promise<void> => {
    try {
        await post(Endpoints.createCampaignCustomer, { customer_id: customerId, campaign_id: campaignId });
    } catch (error) {
        console.error('Error assigning customer to campaign:', error);
        throw error;
    }
};

export const unassignCustomerFromCampaign = async (campaignCustomerId: number): Promise<void> => {
    try {
        await del(Endpoints.deleteCampaignCustomer(campaignCustomerId.toString()));
    } catch (error) {
        console.error('Error unassigning customer from campaign:', error);
        throw error;
    }
};

export const fetchCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await get(Endpoints.getCustomers);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const fetchCampaigns = async (): Promise<DripCampaign[]> => {
    try {
        const response = await get(Endpoints.getCampaigns);
        return response.data;
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
    }
};