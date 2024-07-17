import { Endpoints } from '@/lib/endpoints';
import { del, get, post, put } from '../../lib/api';

export const fetchCustomers = async (): Promise<Customer[]> => {
    try {
        const response = await get(Endpoints.getCustomers);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

export const updateCustomer = async (customerId: number, updatedData: Partial<Customer>): Promise<void> => {
    try {
        await put(Endpoints.updateCustomer(customerId.toString()), updatedData);
    } catch (error) {
        console.error('Error updating customer:', error);
        throw error;
    }
};

export const deleteCustomer = async (customerId: number): Promise<void> => {
    try {
        await del(Endpoints.deleteCustomer(customerId.toString()));
    } catch (error) {
        console.error('Error deleting customer:', error);
        throw error;
    }
};

export const createCustomer = async (newCustomerData: Partial<Customer>): Promise<Customer> => {
    try {
        const response = await post(Endpoints.createCustomer, newCustomerData);
        return response.data;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

type Customer = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
};