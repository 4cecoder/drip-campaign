// app/types.ts

export type Customer = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    stage: string;
    stagePoint?: string;
    inCampaign: boolean;
};

export type StagePoints = {
    [key: string]: string[];
};