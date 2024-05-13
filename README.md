# drip-campaign

[![Go](https://github.com/4cecoder/drip-campaign/actions/workflows/go.yml/badge.svg)](https://github.com/4cecoder/drip-campaign/actions/workflows/go.yml)

## Introduction
This is a simple web application for email drip campaign automation. It allows users to create drip campaigns consisting of multiple stages, each with predefined steps. The application automates the process of sending emails to customers at scheduled intervals, based on the configured drip campaign.

## Backend Models

### DripCampaign
- Represents a drip campaign with a name, description, status, start date, end date, and stages.

### Stage
- Represents a stage within a drip campaign, containing a name, description, order, and steps.

### Step
- Represents a step within a stage, including its name, description, email subject, email body, and wait time.

### Customer
- Represents a customer with email, first name, last name, and phone number.

### CampaignCustomer
- Represents the association between a drip campaign and a customer, including status, start date, end date, and subscription status.

### EmailTemplate
- Represents an email template with a name, subject, body, and content type.

### EmailLog
- Represents the log of emails sent, including the campaign ID, customer ID, email template ID, subject, body, sent timestamp, and status.

### Settings
- Represents user settings, including CRM API key, Gmail credentials, and email polling interval.

### User
- Represents a user with email and hashed password.

## Backend
The backend is built with Golang using the Gin framework and Gorm for database interactions. It exposes RESTful API endpoints for managing drip campaigns, customers, email templates, and user authentication.

## Frontend
The frontend is under development and will be built using TypeScript, Next.js, and Tailwind CSS. It will provide a user-friendly interface for creating and managing drip campaigns, viewing customer data, and configuring email templates.

## Hosting
The entire application is hosted using the Golang server. Frontend routes will be accessible from the base URL (`/`) and backend routes will be prefixed with `/api/v1/`.

## Dependencies
- Backend: Golang, Gin, Gorm, PostgreSQL
- Frontend: Next.js, Typescript, Tailwind CSS

## Contributors
- [4cecoder](https://github.com/4cecoder)
- [Ahmed](https://github.com/AhmedBarre1)

## License
This project is licensed under the [MIT License](LICENSE).
