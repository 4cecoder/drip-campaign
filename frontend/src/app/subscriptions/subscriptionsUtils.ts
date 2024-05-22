import { Endpoints } from '@/lib/endpoints';
import { get, post, put } from '../util/api';

export type Customer = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    company: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    notes: string;
    tags: string;
    emailVerified: boolean;
    subscribed: boolean;
    lastContacted: string;
    leadSource: string;
    leadStatus: string;
    createdBy: number;
    assignedTo: number;
    stage: string;
    stagePoint?: string;
    inCampaign: boolean;
    campaignCustomerId?: number;
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

export const updateCustomerSubscription = async (customerId: number): Promise<void> => {
    try {
        await put(Endpoints.updateCustomer(customerId.toString()), { subscribed: true });
    } catch (error) {
        console.error('Error updating subscription status:', error);
        throw error;
    }
};

export const saveUnsubscribeTemplate = async (template: string): Promise<void> => {
    try {
        await put(Endpoints.updateSettings, { unsubscribeTemplate: template });
    } catch (error) {
        console.error('Error saving unsubscribe template:', error);
        throw error;
    }
};