'use client';

import React, { useEffect, useState } from 'react';
import { FaPlay, FaPause, FaEnvelope, FaArrowRight, FaArrowLeft, FaFileImport, FaPeopleCarry } from 'react-icons/fa';
import Link from "next/link";
import withAuth from "@/lib/withAuth";

// Import shadcn UI components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { Customer, DripCampaign} from './types';

// Demo data
const demoCustomers: Customer[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', stage: 'Awareness', stagePoint: '1', inCampaign: true, campaignCustomerId: 1 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', stage: 'Consideration', stagePoint: '2', inCampaign: true, campaignCustomerId: 2 },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', stage: 'Decision', stagePoint: '3', inCampaign: false, campaignCustomerId: 3 },
  { id: 4, firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com' },
  { id: 5, firstName: 'Charlie', lastName: 'Wilson', email: 'charlie@example.com' },
];

const demoCampaigns: DripCampaign[] = [
  { id: 1, name: 'Welcome Series', customers: [] },
  { id: 2, name: 'Product Launch', customers: [] },
];

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
    const [campaigns] = useState<DripCampaign[]>(demoCampaigns);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            const assignedCustomers = demoCustomers.filter((customer) => customer.campaignCustomerId !== undefined);
            const unassignedCustomers = demoCustomers.filter((customer) => customer.campaignCustomerId === undefined);

            setAssignedCustomers(assignedCustomers);
            setUnassignedCustomers(unassignedCustomers);
            setIsLoading(false);
        }, 1500); // Simulate a 1.5 second loading time
    }, []);

    const handleStageChange = (customerId: number, newStage: string) => {
        setAssignedCustomers(prev => prev.map(customer => 
            customer.id === customerId ? {...customer, stage: newStage} : customer
        ));
    };

    const handleStagePointChange = (customerId: number, newStagePoint: string) => {
        setAssignedCustomers(prev => prev.map(customer => 
            customer.id === customerId ? {...customer, stagePoint: newStagePoint} : customer
        ));
    };

    const handleCampaignToggle = (campaignCustomerId: number) => {
        setAssignedCustomers(prev => prev.map(customer => 
            customer.campaignCustomerId === campaignCustomerId ? {...customer, inCampaign: !customer.inCampaign} : customer
        ));
    };

    const assignCustomer = (customerId: number, campaignId: number) => {
        const customerToAssign = unassignedCustomers.find(c => c.id === customerId);
        if (customerToAssign) {
            setUnassignedCustomers(prev => prev.filter(c => c.id !== customerId));
            setAssignedCustomers(prev => [...prev, {...customerToAssign, campaignCustomerId: Date.now(), inCampaign: true}]);
        }
    };

    const unassignCustomer = (campaignCustomerId: number) => {
        const customerToUnassign = assignedCustomers.find(c => c.campaignCustomerId === campaignCustomerId);
        if (customerToUnassign) {
            setAssignedCustomers(prev => prev.filter(c => c.campaignCustomerId !== campaignCustomerId));
            setUnassignedCustomers(prev => [...prev, {...customerToUnassign, campaignCustomerId: undefined, inCampaign: false}]);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-gray-300 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Drip Campaign Management
                </h1>
                <div className="flex gap-4 mb-8 justify-center">
                    <Link href="/import">
                        <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 text-gray-300">
                            <FaFileImport className="mr-2" />
                            Import Customers
                        </Button>
                    </Link>
                    <Link href="/customers">
                        <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 text-gray-300">
                            <FaPeopleCarry className="mr-2" />
                            Manage Customers
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Email Campaign Customers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                Array(3).fill(0).map((_, index) => (
                                    <CustomerCardSkeleton key={index} />
                                ))
                            ) : (
                                assignedCustomers.map((customer) => (
                                    <CustomerCard
                                        key={customer.id}
                                        customer={customer}
                                        onStageChange={handleStageChange}
                                        onStagePointChange={handleStagePointChange}
                                        onCampaignToggle={handleCampaignToggle}
                                        onUnassign={unassignCustomer}
                                    />
                                ))
                            )}
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Search Unmanaged Leads
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                Array(3).fill(0).map((_, index) => (
                                    <UnassignedCustomerCardSkeleton key={index} />
                                ))
                            ) : (
                                unassignedCustomers.map((customer) => (
                                    <UnassignedCustomerCard
                                        key={customer.id}
                                        customer={customer}
                                        onAssign={assignCustomer}
                                    />
                                ))
                            )}
                        </CardContent>
                    </Card>
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
    <Card className="mb-4 bg-gray-700 border-gray-600">
        <CardContent className="pt-6">
            <h4 className="text-lg font-bold text-gray-200">{customer.firstName} {customer.lastName}</h4>
            <p className="text-gray-400">Email: {customer.email}</p>
            <div className="mt-4">
                <label htmlFor={`stage-${customer.id}`} className="mr-2 text-gray-300">Campaign Stage:</label>
                <Select onValueChange={(value) => onStageChange(customer.id, value)} value={customer.stage || ''}>
                    <SelectTrigger className="bg-gray-600 text-gray-300 border-gray-500">
                        <SelectValue placeholder="Select Stage" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-gray-300">
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {/* Render stage options based on the campaign */}
                    </SelectContent>
                </Select>
            </div>
            {customer.stage && (
                <div className="mt-4">
                    <label htmlFor={`stagePoint-${customer.id}`} className="mr-2 text-gray-300">Stage Steps:</label>
                    <Select onValueChange={(value) => onStagePointChange(customer.id, value)} value={customer.stagePoint || ''}>
                        <SelectTrigger className="bg-gray-600 text-gray-300 border-gray-500">
                            <SelectValue placeholder="Select Step" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 text-gray-300">
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                            {/* Render stage point options based on the selected stage */}
                        </SelectContent>
                    </Select>
                </div>
            )}
            <div className="mt-4 flex gap-2">
                <Button onClick={() => onCampaignToggle(customer.campaignCustomerId!)} className="bg-blue-600 hover:bg-blue-700 text-white">
                    {customer.inCampaign ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
                    {customer.inCampaign ? 'Pause Campaign' : 'Start Campaign'}
                </Button>
                <Button variant="secondary" onClick={() => {/* Add your send email function here */}} className="bg-gray-600 hover:bg-gray-500 text-gray-300">
                    <FaEnvelope className="mr-2" />
                    Send Email
                </Button>
                <Button variant="destructive" onClick={() => onUnassign(customer.campaignCustomerId!)} className="bg-red-600 hover:bg-red-700 text-white">
                    <FaArrowRight className="mr-2" />
                    Unassign
                </Button>
            </div>
        </CardContent>
    </Card>
);

const UnassignedCustomerCard: React.FC<UnassignedCustomerCardProps> = ({ customer, onAssign }) => (
    <Card className="mb-4 bg-gray-700 border-gray-600">
        <CardContent className="pt-6">
            <h4 className="text-lg font-bold text-gray-200">{customer.firstName} {customer.lastName}</h4>
            <p className="text-gray-400">Email: {customer.email}</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={() => onAssign(customer.id, 1)}>
                <FaArrowLeft className="mr-2" />
                Assign to Campaign
            </Button>
        </CardContent>
    </Card>
);

const CustomerCardSkeleton: React.FC = () => (
    <Card className="mb-4 bg-gray-700 border-gray-600">
        <CardContent className="pt-6">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="mt-4">
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
            </div>
            <div className="mt-4 flex gap-2">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-10 w-1/3" />
            </div>
        </CardContent>
    </Card>
);

const UnassignedCustomerCardSkeleton: React.FC = () => (
    <Card className="mb-4 bg-gray-700 border-gray-600">
        <CardContent className="pt-6">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-10 w-1/2 mt-4" />
        </CardContent>
    </Card>
);

export default withAuth(CustomerManagement);