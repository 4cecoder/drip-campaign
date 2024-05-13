// app/customers/page.tsx
'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay, faPause, faEnvelope, faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { Customer, StagePoints } from './types';
const stagePoints: StagePoints = {
    leads: ['Identified', 'Contacted', 'Engaged'],
    consultation: ['Initial Meeting', 'Follow-up', 'Final Review'],
    proposal: ['Drafted', 'Sent', 'Revised'],
    scheduled: ['Appointment Set', 'Reminder Sent', 'Completed'],
    signing: ['Documents Prepared', 'Signing Underway', 'Signed'],
    install: ['Scheduled', 'In Progress', 'Finalized'],
    maintenance: ['Scheduled', 'In Progress', 'Completed']
};

type CustomerCardProps = {
    customer: Customer;
    stagePoints: StagePoints;
    onStageChange: (id: string, newStage: string) => void;
    onStagePointChange: (id: string, newStagePoint: string) => void;
    onCampaignToggle: (id: string) => void;
    onUnassign: (id: string) => void;
};

type UnassignedCustomerCardProps = {
    customer: Customer;
    onAssign: (id: string) => void;
};


const demoAssignedCustomers: Customer[] = [
    {
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        stage: 'leads',
        inCampaign: true,
    },
    {
        id: '2',
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        stage: 'consultation',
        inCampaign: true,
    },
    // Add more demo assigned customers
];

const demoUnassignedCustomers: Customer[] = [
    {
        id: '3',
        first_name: 'Alice',
        last_name: 'Johnson',
        email: 'alice@example.com',
        stage: '',
        inCampaign: false,
    },
    {
        id: '4',
        first_name: 'Bob',
        last_name: 'Williams',
        email: 'bob@example.com',
        stage: '',
        inCampaign: false,
    },
    // Add more demo unassigned customers
];

const CustomerManagement: React.FC = () => {
    const handleStageChange = async (id: string, newStage: string) => {
        // Update customer stage in the demo data
        console.log(`Updating customer ${id} stage to ${newStage}`);
    };

    const handleStagePointChange = async (id: string, newStagePoint: string) => {
        // Update customer stage point in the demo data
        console.log(`Updating customer ${id} stage point to ${newStagePoint}`);
    };

    const toggleCustomerCampaignStatus = async (id: string) => {
        // Toggle customer campaign status in the demo data
        console.log(`Toggling campaign status for customer ${id}`);
    };

    const assignCustomer = async (id: string) => {
        // Assign customer to the campaign in the demo data
        console.log(`Assigning customer ${id} to the campaign`);
    };

    const unassignCustomer = async (id: string) => {
        // Unassign customer from the campaign in the demo data
        console.log(`Unassigning customer ${id} from the campaign`);
    };

    return (
        <div className="bg-black min-h-screen text-white px-4 py-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Drip Campaign Management
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg">
                        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Email Campaign Customers
                        </h2>
                        {demoAssignedCustomers.map((customer) => (
                            <CustomerCard
                                key={customer.id}
                                customer={customer}
                                stagePoints={stagePoints}
                                onStageChange={handleStageChange}
                                onStagePointChange={handleStagePointChange}
                                onCampaignToggle={() => toggleCustomerCampaignStatus(customer.id)}
                                onUnassign={() => unassignCustomer(customer.id)}
                            />
                        ))}
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg">
                        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Search Unmanaged Enerflo Leads
                        </h2>
                        {demoUnassignedCustomers.map((customer) => (
                            <UnassignedCustomerCard
                                key={customer.id}
                                customer={customer}
                                onAssign={() => assignCustomer(customer.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const CustomerCard: React.FC<CustomerCardProps> = ({
                                                       customer,
                                                       stagePoints,
                                                       onStageChange,
                                                       onStagePointChange,
                                                       onCampaignToggle,
                                                       onUnassign,
                                                   }) => (
    <div className="bg-gray-800 rounded-lg p-4 shadow mb-4">
        <h4 className="text-lg font-bold">{customer.first_name} {customer.last_name}</h4>
        <p>Email: {customer.email}</p>
        <label htmlFor={`stage-${customer.id}`} className="mr-2">Campaign Stage:</label>
        <select
            id={`stage-${customer.id}`}
            className="m-2 bg-gray-700 text-white p-2 rounded"
            value={customer.stage}
            onChange={(e) => onStageChange(customer.id, e.target.value)}
        >
            {Object.keys(stagePoints).map(stage => (
                <option key={stage} value={stage}>{stage}</option>
            ))}
        </select>
        {stagePoints[customer.stage] && (
            <>
                <label htmlFor={`stagePoint-${customer.id}`} className="mr-2">Stage Steps:</label>
                <select
                    id={`stagePoint-${customer.id}`}
                    className="m-2 bg-gray-700 text-white p-2 rounded"
                    value={customer.stagePoint || ''}
                    onChange={(e) => onStagePointChange(customer.id, e.target.value)}
                >
                    <option value="">Select Step</option>
                    {stagePoints[customer.stage].map(point => (
                        <option key={point} value={point}>{point}</option>
                    ))}
                </select>
            </>
        )}
        <button
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => onCampaignToggle(customer.id)}
        >
            <FontAwesomeIcon icon={customer.inCampaign ? faPause : faPlay} />
            {customer.inCampaign ? ' Pause Campaign' : ' Start Campaign'}
        </button>
        <button
            className="m-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => {/* Add your send email function here */ }}
        >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Send Email
        </button>
        <button
            className="m-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => onUnassign(customer.id)}
        >
            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
            Unassign
        </button>
    </div>
);

const UnassignedCustomerCard: React.FC<UnassignedCustomerCardProps> = ({ customer, onAssign }) => (
    <div className="bg-gray-800 rounded-lg p-4 shadow mb-4">
        <h4 className="text-lg font-bold">{customer.first_name} {customer.last_name}</h4>
        <p>Email: {customer.email}</p>
        <button
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => onAssign(customer.id)}
        >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Assign to Campaign
        </button>
    </div>
);

export default CustomerManagement;