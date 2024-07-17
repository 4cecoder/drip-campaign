// app/campaigns/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FaPlay, FaPause, FaEnvelope, FaArrowRight, FaArrowLeft, FaFileImport, FaPeopleCarry} from 'react-icons/fa';
import Link from "next/link";
import withAuth from "@/lib/withAuth";
import {
    Customer,
    updateCustomerStage,
    updateCustomerStagePoint,
    toggleCustomerCampaignStatus,
    assignCustomerToCampaign,
    unassignCustomerFromCampaign,
    fetchCustomers,
    fetchCampaigns
} from './campaignUtils';

type CustomerCardProps = {
    customer: Customer;
    onStageChange: (customerId: number, newStage: string) => void;
    onStagePointChange: (customerId: number, newStagePoint: string) => void;
    onCampaignToggle: (campaignCustomerId: number) => void;
    onUnassign: (campaignCustomerId: number) => void;
};

type UnassignedCustomerCardProps = {
    customer: Customer;
    onAssign: (customerId: number, campaignId: number) => void;
};

const CustomerManagement: React.FC = () => {
    const [assignedCustomers, setAssignedCustomers] = useState<Customer[]>([]);
    const [unassignedCustomers, setUnassignedCustomers] = useState<Customer[]>([]);
    const [campaigns, setCampaigns] = useState<DripCampaign[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const customers = await fetchCustomers();
            const campaigns = await fetchCampaigns();

            const assignedCustomers = customers.filter((customer) => customer.campaignCustomerId !== undefined);
            const unassignedCustomers = customers.filter((customer) => customer.campaignCustomerId === undefined);

            setAssignedCustomers(assignedCustomers);
            setUnassignedCustomers(unassignedCustomers);
            setCampaigns(campaigns);
        };

        fetchData();
    }, []);

    const handleStageChange = async (customerId: number, newStage: string) => {
        await updateCustomerStage(customerId, newStage);
        // Refresh the customer data or update the state accordingly
    };

    const handleStagePointChange = async (customerId: number, newStagePoint: string) => {
        await updateCustomerStagePoint(customerId, newStagePoint);
        // Refresh the customer data or update the state accordingly
    };

    const handleCampaignToggle = async (campaignCustomerId: number) => {
        await toggleCustomerCampaignStatus(campaignCustomerId);
        // Refresh the customer data
        const updatedCustomers = await fetchCustomers();
        const assignedCustomers = updatedCustomers.filter((customer) => customer.campaignCustomerId !== undefined);
        const unassignedCustomers = updatedCustomers.filter((customer) => customer.campaignCustomerId === undefined);
        setAssignedCustomers(assignedCustomers);
        setUnassignedCustomers(unassignedCustomers);
    };

    const assignCustomer = async (customerId: number, campaignId: number) => {
        await assignCustomerToCampaign(customerId, campaignId);
        // Refresh the customer data or update the state accordingly
    };

    const unassignCustomer = async (campaignCustomerId: number) => {
        await unassignCustomerFromCampaign(campaignCustomerId);
        // Refresh the customer data or update the state accordingly
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white px-4 py-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Drip Campaign Management
                </h1>
                <Link href={"/import"}>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200 mb-4">
                        <FaFileImport className="inline mr-2" />
                        Import Customers
                    </button>
                </Link>
                <Link href={"/customers"}>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200 ml-2 mb-4">
                        <FaPeopleCarry className="inline mr-2" />
                        Manage Customers
                    </button>
                </Link>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg">
                        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Email Campaign Customers
                        </h2>
                        {assignedCustomers.map((customer) => (
                            <CustomerCard
                                key={customer.id}
                                customer={customer}
                                onStageChange={handleStageChange}
                                onStagePointChange={handleStagePointChange}
                                onCampaignToggle={handleCampaignToggle}
                                onUnassign={unassignCustomer}
                            />
                        ))}
                    </div>
                    <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg">
                        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Search Unmanaged Leads
                        </h2>
                        {unassignedCustomers.map((customer) => (
                            <UnassignedCustomerCard
                                key={customer.id}
                                customer={customer}
                                onAssign={assignCustomer}
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
                                                       onStageChange,
                                                       onStagePointChange,
                                                       onCampaignToggle,
                                                       onUnassign,
                                                   }) => (
    <div className="bg-gray-800 rounded-lg p-4 shadow mb-4">
        <h4 className="text-lg font-bold">{customer.firstName} {customer.lastName}</h4>
        <p>Email: {customer.email}</p>
        <label htmlFor={`stage-${customer.id}`} className="mr-2">Campaign Stage:</label>
        <select
            id={`stage-${customer.id}`}
            className="m-2 bg-gray-700 text-white p-2 rounded"
            value={customer.stage || ''}
            onChange={(e) => onStageChange(customer.id, e.target.value)}
        >
            <option value="">Select Stage</option>
            {/* Render stage options based on the campaign */}
        </select>
        {customer.stage && (
            <>
                <label htmlFor={`stagePoint-${customer.id}`} className="mr-2">Stage Steps:</label>
                <select
                    id={`stagePoint-${customer.id}`}
                    className="m-2 bg-gray-700 text-white p-2 rounded"
                    value={customer.stagePoint || ''}
                    onChange={(e) => onStagePointChange(customer.id, e.target.value)}
                >
                    <option value="">Select Step</option>
                    {/* Render stage point options based on the selected stage */}
                </select>
            </>
        )}
        <button
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => onCampaignToggle(customer.campaignCustomerId!)}
        >
            {customer.inCampaign ? <FaPause className="inline mr-2" /> : <FaPlay className="inline mr-2" />}
            {customer.inCampaign ? 'Pause Campaign' : 'Start Campaign'}
        </button>
        <button
            className="m-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => {
                /* Add your send email function here */
            }}
        >
            <FaEnvelope className="inline mr-2" />
            Send Email
        </button>
        <button
            className="m-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => onUnassign(customer.campaignCustomerId!)}
        >
            <FaArrowRight className="inline mr-2" />
            Unassign
        </button>
    </div>
);

const UnassignedCustomerCard: React.FC<UnassignedCustomerCardProps> = ({ customer, onAssign }) => (
    <div className="bg-gray-800 rounded-lg p-4 shadow mb-4">
        <h4 className="text-lg font-bold">{customer.firstName} {customer.lastName}</h4>
        <p>Email: {customer.email}</p>
        <button
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            onClick={() => onAssign(customer.id, 1)} // Assuming campaign ID is 1
        >
            <FaArrowLeft className="inline mr-2" />
            Assign to Campaign
        </button>
    </div>
);

export default withAuth(CustomerManagement);