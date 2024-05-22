// app/campaigns/campaignUtils.ts

import { Endpoints } from '@/lib/endpoints';
import { Customer} from './types';
import { del, get, post, put } from '../util/api';

export const updateCustomerStage = async (customerId: string, newStage: string): Promise<void> => {
    try {
        await put(Endpoints.updateCustomer(customerId), { stage: newStage });
    } catch (error) {
        console.error('Error updating customer stage:', error);
        throw error;
    }
};

export const updateCustomerStagePoint = async (customerId: string, newStagePoint: string): Promise<void> => {
    try {
        await put(Endpoints.updateCustomer(customerId), { stagePoint: newStagePoint });
    } catch (error) {
        console.error('Error updating customer stage point:', error);
        throw error;
    }
};

export const toggleCustomerCampaignStatus = async (campaignCustomerId: string): Promise<void> => {
    try {
        await put(Endpoints.updateCampaignCustomer(campaignCustomerId), { subscribed: true });
    } catch (error) {
        console.error('Error toggling customer campaign status:', error);
        throw error;
    }
};

export const assignCustomerToCampaign = async (customerId: string, campaignId: number): Promise<void> => {
    try {
        await post(Endpoints.createCampaignCustomer, { customer_id: customerId, campaign_id: campaignId });
    } catch (error) {
        console.error('Error assigning customer to campaign:', error);
        throw error;
    }
};

export const unassignCustomerFromCampaign = async (campaignCustomerId: string): Promise<void> => {
    try {
        await del(Endpoints.deleteCampaignCustomer(campaignCustomerId));
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