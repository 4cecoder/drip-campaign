# drip-campaign

[![Go](https://github.com/4cecoder/drip-campaign/actions/workflows/go.yml/badge.svg)](https://github.com/4cecoder/drip-campaign/actions/workflows/go.yml)

## Introduction

This is a simple web application for email drip campaign automation. It allows users to create drip campaigns consisting of multiple stages, each with predefined steps. The application automates the process of sending emails to customers at scheduled intervals, based on the configured drip campaign.

## Software Overview:
The product is a web application aimed at managing sales campaigns and customer interactions. It consists of the following main features:

**Import Customers**
- Users can upload CSV or Excel files containing customer data (first name, last name, phone, email, CRM ID)
- The application parses the file and maps the columns to the corresponding customer fields using fuzzy string matching
- Users can review the parsed customer data and create new customer records in the CRM system

**Sales Stages**
- Users can define custom sales stages (e.g., Lead Generation, Qualification, Proposal, etc.)
- Each stage can have multiple steps with customizable email templates and wait times
- Users can edit stage names, add/remove steps, and configure email templates and wait times for each step

**Settings**
- Users can configure the CRM integration by selecting the CRM system (Enerflo, HubSpot, Salesforce) and providing the base URL and API key
- Users can set up email settings, including the Gmail account and password used for sending campaign emails
- Users can set the polling interval for checking customer progression through the sales stages

**Customer Management**
- Users can view and manage customers assigned to the email campaign
- Users can change the customer's current stage and stage step
- Users can start, pause, or resume the email campaign for individual customers
- Users can manually send emails to customers
- Users can search for unmanaged leads and assign them to the email campaign

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

## Swagger Documentation

This project uses [go-swagger](https://github.com/go-swagger/go-swagger) for API documentation. To generate the Swagger documentation, run the following command:

```bash
swag init
```


This will generate the Swagger specification file `docs/docs.go` and other necessary files for serving the Swagger UI.

After generating the Swagger files, you can import the `docs/docs.go` file in your Go code to serve the Swagger UI alongside your API.

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
