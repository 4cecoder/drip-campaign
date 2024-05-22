// app/campaigns/types.ts

export type Customer = {
    campaign_id: string;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    stage: string;
    stagePoint?: string;
    inCampaign: boolean;
    campaignCustomerId?: number;
};

export type StagePoints = {
    [key: string]: string[];
};