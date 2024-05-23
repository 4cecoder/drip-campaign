// src/app/util/globalTypes.ts
declare global {
    interface Model {
        id: number;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        created_by: number;
        updated_by: number;
    }

    interface DripCampaign extends Model {
        name: string;
        description: string;
        status: string;
        start_date: string;
        end_date: string;
        stages: Stage[];
    }

    interface Stage extends Model {
        campaign_id: number;
        name: string;
        description: string;
        order: number;
        steps: Step[];
    }

    interface Step extends Model {
        stage_id: number;
        name: string;
        description: string;
        email_template_id: number;
        email_template: EmailTemplate | null;
        wait_time: number;
    }

    interface Customer extends Model {
        email: string;
        first_name: string;
        last_name: string;
        phone: string | null;
        company: string | null;
        address: string | null;
        city: string | null;
        state: string | null;
        country: string | null;
        postal_code: string | null;
        notes: string | null;
        tags: string | null;
        email_verified: boolean;
        subscribed: boolean;
        last_contacted: string | null;
        lead_source: string | null;
        lead_status: string | null;
        assigned_to: number;
    }

    interface CampaignCustomer extends Model {
        campaign_id: number;
        customer_id: number;
        status: string;
        start_date: string;
        end_date: string;
        subscribed: boolean;
    }

    interface EmailTemplate extends Model {
        name: string;
        subject: string;
        body: string;
        content_type: string;
    }

    interface EmailLog extends Model {
        campaign_id: number;
        customer_id: number;
        email_template_id: number;
        subject: string;
        body: string;
        sent_at: string;
        status: string;
    }

    interface Settings extends Model {
        user_id: number;
        crm_api_key: string;
        gmail_email: string;
        gmail_password: string;
        email_polling_seconds: number;
    }

    interface TokenResponse {
        token: string;
    }

    interface ErrorResponse {
        error: string;
    }

    interface SuccessResponse {
        message: string;
    }

    interface EmailRequest {
        to: string;
        subject: string;
        body: string;
    }

    interface User {
        email: string;
        role: string;
    }

    interface LoginRequest {
        email: string;
        password: string;
    }
}

export {};