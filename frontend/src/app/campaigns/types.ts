export type Customer = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    company?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    notes?: string;
    tags?: string;
    emailVerified?: boolean;
    subscribed?: boolean;
    lastContacted?: string;
    leadSource?: string;
    leadStatus?: string;
    createdBy?: number;
    assignedTo?: number;
    stage?: string;
    stagePoint?: string;
    inCampaign?: boolean;
    campaignCustomerId?: number;
};

export type StagePoints = {
    [key: string]: string[];
};


export type DripCampaign = {
    id: number;
    name: string;
    customers: Customer[];
};