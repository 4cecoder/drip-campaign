import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1';

class API {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add request interceptor for adding authorization token
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Add response interceptor for handling errors
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Handle unauthorized error (e.g., redirect to login)
                    // ...
                }
                return Promise.reject(error);
            }
        );
    }

    // Authentication
    async login(email: string, password: string): Promise<AxiosResponse> {
        return this.instance.post('/login', { email, password });
    }

    // Campaigns
    async createCampaign(campaignData: any): Promise<AxiosResponse> {
        return this.instance.post('/campaigns', campaignData);
    }

    async getCampaigns(): Promise<AxiosResponse> {
        return this.instance.get('/campaigns');
    }

    async getCampaign(campaignId: number): Promise<AxiosResponse> {
        return this.instance.get(`/campaigns/${campaignId}`);
    }

    async updateCampaign(campaignId: number, campaignData: any): Promise<AxiosResponse> {
        return this.instance.put(`/campaigns/${campaignId}`, campaignData);
    }

    async deleteCampaign(campaignId: number): Promise<AxiosResponse> {
        return this.instance.delete(`/campaigns/${campaignId}`);
    }

    // Stages
    async createStage(stageData: any): Promise<AxiosResponse> {
        return this.instance.post('/stages', stageData);
    }

    async getStages(): Promise<AxiosResponse> {
        return this.instance.get('/stages');
    }

    async getStage(stageId: number): Promise<AxiosResponse> {
        return this.instance.get(`/stages/${stageId}`);
    }

    async updateStage(stageId: number, stageData: any): Promise<AxiosResponse> {
        return this.instance.put(`/stages/${stageId}`, stageData);
    }

    async deleteStage(stageId: number): Promise<AxiosResponse> {
        return this.instance.delete(`/stages/${stageId}`);
    }

    // Steps
    async createStep(stepData: any): Promise<AxiosResponse> {
        return this.instance.post('/steps', stepData);
    }

    async getSteps(): Promise<AxiosResponse> {
        return this.instance.get('/steps');
    }

    async getStep(stepId: number): Promise<AxiosResponse> {
        return this.instance.get(`/steps/${stepId}`);
    }

    async updateStep(stepId: number, stepData: any): Promise<AxiosResponse> {
        return this.instance.put(`/steps/${stepId}`, stepData);
    }

    async deleteStep(stepId: number): Promise<AxiosResponse> {
        return this.instance.delete(`/steps/${stepId}`);
    }

    // Customers
    async createCustomer(customerData: any): Promise<AxiosResponse> {
        return this.instance.post('/customers', customerData);
    }

    async getCustomers(): Promise<AxiosResponse> {
        return this.instance.get('/customers');
    }

    async getCustomer(customerId: number): Promise<AxiosResponse> {
        return this.instance.get(`/customers/${customerId}`);
    }

    async updateCustomer(customerId: number, customerData: any): Promise<AxiosResponse> {
        return this.instance.put(`/customers/${customerId}`, customerData);
    }

    async deleteCustomer(customerId: number): Promise<AxiosResponse> {
        return this.instance.delete(`/customers/${customerId}`);
    }

    // Campaign Customers
    async createCampaignCustomer(campaignCustomerData: any): Promise<AxiosResponse> {
        return this.instance.post('/campaign-customers', campaignCustomerData);
    }

    async getCampaignCustomers(): Promise<AxiosResponse> {
        return this.instance.get('/campaign-customers');
    }

    async getCampaignCustomer(campaignCustomerId: number): Promise<AxiosResponse> {
        return this.instance.get(`/campaign-customers/${campaignCustomerId}`);
    }

    async updateCampaignCustomer(campaignCustomerId: number, campaignCustomerData: any): Promise<AxiosResponse> {
        return this.instance.put(`/campaign-customers/${campaignCustomerId}`, campaignCustomerData);
    }

    async deleteCampaignCustomer(campaignCustomerId: number): Promise<AxiosResponse> {
        return this.instance.delete(`/campaign-customers/${campaignCustomerId}`);
    }

    // Settings
    async getSettings(): Promise<AxiosResponse> {
        return this.instance.get('/settings');
    }

    async updateSettings(settingsData: any): Promise<AxiosResponse> {
        return this.instance.put('/settings', settingsData);
    }

    // Send Email
    async sendEmail(emailData: any): Promise<AxiosResponse> {
        return this.instance.post('/send-email', emailData);
    }

    // Email Templates
    async createEmailTemplate(emailTemplateData: any): Promise<AxiosResponse> {
        return this.instance.post('/email-templates', emailTemplateData);
    }

    async getEmailTemplates(): Promise<AxiosResponse> {
        return this.instance.get('/email-templates');
    }

    async getEmailTemplate(emailTemplateId: number): Promise<AxiosResponse> {
        return this.instance.get(`/email-templates/${emailTemplateId}`);
    }

    async updateEmailTemplate(emailTemplateId: number, emailTemplateData: any): Promise<AxiosResponse> {
        return this.instance.put(`/email-templates/${emailTemplateId}`, emailTemplateData);
    }

    async deleteEmailTemplate(emailTemplateId: number): Promise<AxiosResponse> {
        return this.instance.delete(`/email-templates/${emailTemplateId}`);
    }

    // Admin Routes
    async createUser(userData: any): Promise<AxiosResponse> {
        return this.instance.post('/admin/users', userData);
    }

    async getUsers(): Promise<AxiosResponse> {
        return this.instance.get('/admin/users');
    }

    async getUser(userId: number): Promise<AxiosResponse> {
        return this.instance.get(`/admin/users/${userId}`);
    }

    async updateUser(userId: number, userData: any): Promise<AxiosResponse> {
        return this.instance.put(`/admin/users/${userId}`, userData);
    }

    async deleteUser(userId: number): Promise<AxiosResponse> {
        return this.instance.delete(`/admin/users/${userId}`);
    }
}

export default new API();