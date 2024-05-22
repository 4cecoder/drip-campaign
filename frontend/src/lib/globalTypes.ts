// src/app/util/globalTypes.ts

declare global {
    interface Model {
        id: number;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
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
        phone: string;
    }

    interface EmailTemplate extends Model {
        name: string;
        subject: string;
        body: string;
        content_type: string;
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