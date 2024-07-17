import config from '@/lib/config';

const API_BASE_URL = config.API_BASE_URL;

export const Endpoints = {
    // Auth
    login: `${API_BASE_URL}/login`,

    // Campaigns
    createCampaign: `${API_BASE_URL}/campaigns`,
    getCampaigns: `${API_BASE_URL}/campaigns`,
    getCampaign: (id: number) => `${API_BASE_URL}/campaigns/${id}`,
    updateCampaign: (id: number) => `${API_BASE_URL}/campaigns/${id}`,
    deleteCampaign: (id: number) => `${API_BASE_URL}/campaigns/${id}`,

    // Stages
    createStage: `${API_BASE_URL}/stages`,
    getStages: `${API_BASE_URL}/stages`,
    getStage: (id: number) => `${API_BASE_URL}/stages/${id}`,
    updateStage: (id: number) => `${API_BASE_URL}/stages/${id}`,
    deleteStage: (id: number) => `${API_BASE_URL}/stages/${id}`,

    // Steps
    createStep: `${API_BASE_URL}/steps`,
    getSteps: `${API_BASE_URL}/steps`,
    getStep: (id: number) => `${API_BASE_URL}/steps/${id}`,
    updateStep: (id: number) => `${API_BASE_URL}/steps/${id}`,
    deleteStep: (id: number) => `${API_BASE_URL}/steps/${id}`,

    // Customers
    createCustomer: `${API_BASE_URL}/customers`,
    getCustomers: `${API_BASE_URL}/customers`,
    getCustomer: (id: number) => `${API_BASE_URL}/customers/${id}`,
    updateCustomer: (id: string) => `${API_BASE_URL}/customers/${id}`,
    deleteCustomer: (id: string) => `${API_BASE_URL}/customers/${id}`,

    // Campaign Customers
    createCampaignCustomer: `${API_BASE_URL}/campaign-customers`,
    getCampaignCustomers: `${API_BASE_URL}/campaign-customers`,
    getCampaignCustomer: (id: number) => `${API_BASE_URL}/campaign-customers/${id}`,
    updateCampaignCustomer: (id: string) => `${API_BASE_URL}/campaign-customers/${id}`,
    deleteCampaignCustomer: (id: string) => `${API_BASE_URL}/campaign-customers/${id}`,

    // Send Email
    sendEmail: `${API_BASE_URL}/send-email`,

    // Email Templates
    createEmailTemplate: `${API_BASE_URL}/templates`,
    getEmailTemplates: `${API_BASE_URL}/templates`,
    getEmailTemplate: (id: number) => `${API_BASE_URL}/templates/${id}`,
    updateEmailTemplate: (id: number) => `${API_BASE_URL}/templates/${id}`,
    deleteEmailTemplate: (id: number) => `${API_BASE_URL}/templates/${id}`,

    // Settings
    getSettings: `${API_BASE_URL}/settings`,
    updateSettings: `${API_BASE_URL}/settings`,

    // Admin Only Routes - Users
    createUser: `${API_BASE_URL}/users`,
    getUsers: `${API_BASE_URL}/users`,
    getUser: (id: number) => `${API_BASE_URL}/users/${id}`,
    updateUser: (id: number) => `${API_BASE_URL}/users/${id}`,
    deleteUser: (id: number) => `${API_BASE_URL}/users/${id}`,
};