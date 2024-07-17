export interface Step {
    id: number;
    name: string;
    stage_id: number;
    wait_time: number;
    email_template_id: number;
    description: string;
    email_template: EmailTemplate | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    created_by: number;
    updated_by: number;
  }
  
  export interface Stage {
    id: number;
    name: string;
    steps: Step[];
    campaign_id: number;
    description: string;
    order: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    created_by: number;
    updated_by: number;
  }
  
//   export interface EmailTemplate {
//     id: number;
//     name: string;
//     subject: string;
//     body: string;
//     content_type: string;
//     created_at: string;
//     updated_at: string;
//     deleted_at: string | null;
//     created_by: number | null;
//     updated_by: number | null;
//   }

  export type EmailTemplate = {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: any | null;
    name: string;
    subject: string;
    body: string;
    content_type: string;
    created_by: number | null;
    updated_by: number | null;
    wait_time: number;
};

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
    stages: Stage[];
};