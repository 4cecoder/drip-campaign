# Frontend Overview

## Technology Stack
- Next.js 14.2.4
- React 18.3.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.6

## Project Structure
- `/src/app`: Main application directory
  - `/components`: Reusable React components
  - `/landing`: Landing page
  - `/login`: Login page
  - `/signup`: Signup page
  - `/profile`: User profile page
  - `/campaigns`: Campaign management
  - `/customers`: Customer management
  - `/emails`: Email tracking
  - `/stages`: Sales stages management
  - `/tasks`: Task management
  - `/subscriptions`: Subscription management
  - `/settings`: System settings
  - `/import`: Customer import functionality
  - `/unsubscribe`: Email unsubscribe page

## Key Components

### Navbar (`/src/app/components/Navbar.tsx`)
- Provides navigation for the application
- Renders different menu items based on user authentication

### Layout (`/src/app/layout.tsx`)
- Root layout component
- Handles global styling and navigation structure

### Authentication
- Login page: `/src/app/login/page.tsx`
- Signup page: `/src/app/signup/page.tsx`
- `withAuth` HOC: Used to protect routes that require authentication

### Campaign Management (`/src/app/campaigns/page.tsx`)
- Manages email campaigns and customer assignments
- Allows stage changes and campaign toggling for customers

### Customer Management (`/src/app/customers/page.tsx`)
- CRUD operations for customer data
- Displays customer information in a card layout

### Email Tracking (`/src/app/emails/page.tsx`)
- Tracks email events (sent, delivered, opened, etc.)
- Displays email status and campaign information

### Sales Stages (`/src/app/stages/page.tsx`)
- Manages sales pipeline stages and steps
- Includes email template creation for each step

### Task Management (`/src/app/tasks/page.tsx`)
- Displays and manages tasks associated with campaigns or customers

### Settings (`/src/app/settings/page.tsx`)
- Configures system settings, including CRM integration

### Customer Import (`/src/app/import/page.tsx`)
- Allows bulk import of customer data from CSV or Excel files

## Styling
- Tailwind CSS is used for styling throughout the application
- Dark theme with gradients is consistently applied

## State Management
- React hooks (useState, useEffect) are used for local state management
- No global state management solution is currently implemented

## API Integration
- Axios is used for making HTTP requests to the backend API
- API calls are typically made in utility files (e.g., `campaignUtils.ts`, `customersUtil.ts`)

## Authentication Flow
1. User logs in via `/login` page
2. JWT token is stored in localStorage upon successful login
3. `withAuth` HOC checks for token presence and redirects if not authenticated

## Getting Started
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open http://localhost:3000 in your browser

## Key Files for New Developers
- `/src/app/page.tsx`: Main dashboard/home page
- `/src/app/components/Navbar.tsx`: Navigation component
- `/src/app/layout.tsx`: Root layout structure
- `/src/app/campaigns/page.tsx`: Core campaign management functionality