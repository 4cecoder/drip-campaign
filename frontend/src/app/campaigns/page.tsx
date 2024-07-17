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

import type { Customer, DripCampaign, Stage, Step } from '@/lib/campaignTypes';

// Mock data
const mockStages: Stage[] = [
  {
    id: 1,
    name: 'Awareness',
    steps: [
      { id: 1, name: 'Initial Contact', stage_id: 1, wait_time: 0, email_template_id: 1, description: 'First contact with the customer', email_template: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), deleted_at: null, created_by: 1, updated_by: 1 },
      { id: 2, name: 'Follow-up', stage_id: 1, wait_time: 86400, email_template_id: 2, description: 'Follow-up after initial contact', email_template: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), deleted_at: null, created_by: 1, updated_by: 1 },
    ],
    campaign_id: 1,
    description: 'Awareness stage of the campaign',
    order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: 1,
    updated_by: 1,
  },
  {
    id: 2,
    name: 'Consideration',
    steps: [
      { id: 3, name: 'Product Demo', stage_id: 2, wait_time: 172800, email_template_id: 3, description: 'Schedule and conduct product demo', email_template: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), deleted_at: null, created_by: 1, updated_by: 1 },
      { id: 4, name: 'Case Studies', stage_id: 2, wait_time: 259200, email_template_id: 4, description: 'Send relevant case studies', email_template: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), deleted_at: null, created_by: 1, updated_by: 1 },
    ],
    campaign_id: 1,
    description: 'Consideration stage of the campaign',
    order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: 1,
    updated_by: 1,
  },
  {
    id: 3,
    name: 'Decision',
    steps: [
      { id: 5, name: 'Proposal', stage_id: 3, wait_time: 345600, email_template_id: 5, description: 'Send proposal', email_template: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), deleted_at: null, created_by: 1, updated_by: 1 },
      { id: 6, name: 'Negotiation', stage_id: 3, wait_time: 432000, email_template_id: 6, description: 'Negotiation process', email_template: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), deleted_at: null, created_by: 1, updated_by: 1 },
    ],
    campaign_id: 1,
    description: 'Decision stage of the campaign',
    order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: 1,
    updated_by: 1,
  },
];

const mockCustomers: Customer[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', stage: 'Awareness', stagePoint: 'Initial Contact', inCampaign: true, campaignCustomerId: 101 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', stage: 'Consideration', stagePoint: 'Product Demo', inCampaign: true, campaignCustomerId: 102 },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', stage: 'Decision', stagePoint: 'Proposal', inCampaign: false, campaignCustomerId: 103 },
  { id: 4, firstName: 'Alice', lastName: 'Brown', email: 'alice@example.com' },
  { id: 5, firstName: 'Charlie', lastName: 'Wilson', email: 'charlie@example.com' },
];

const mockCampaigns: DripCampaign[] = [
  { id: 1, name: 'Main Product Campaign', customers: [], stages: mockStages },
  { id: 2, name: 'Newsletter Campaign', customers: [], stages: [] },
];

// Mock context
const useCampaignContext = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [campaigns] = useState<DripCampaign[]>(mockCampaigns);
  const [stages] = useState<Stage[]>(mockStages);

  return { customers, setCustomers, campaigns, stages };
};

const CustomerManagement: React.FC = () => {
    const { customers, setCustomers, campaigns, stages } = useCampaignContext();
    const [isLoading, setIsLoading] = useState(true);

    const assignedCustomers = customers.filter(customer => customer.campaignCustomerId !== undefined);
    const unassignedCustomers = customers.filter(customer => customer.campaignCustomerId === undefined);

    useEffect(() => {
        // Simulate API call delay
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleStageChange = (customerId: number, newStage: string) => {
        setCustomers(prev => prev.map(customer => 
            customer.id === customerId ? {...customer, stage: newStage, stagePoint: undefined} : customer
        ));
    };

    const handleStagePointChange = (customerId: number, newStagePoint: string) => {
        setCustomers(prev => prev.map(customer => 
            customer.id === customerId ? {...customer, stagePoint: newStagePoint} : customer
        ));
    };

    const handleCampaignToggle = (campaignCustomerId: number) => {
        setCustomers(prev => prev.map(customer => 
            customer.campaignCustomerId === campaignCustomerId ? {...customer, inCampaign: !customer.inCampaign} : customer
        ));
    };

    const assignCustomer = (customerId: number, campaignId: number) => {
        setCustomers(prev => prev.map(customer => 
            customer.id === customerId 
                ? {...customer, campaignCustomerId: Date.now(), inCampaign: true, stage: stages[0].name, stagePoint: stages[0].steps[0].name} 
                : customer
        ));
    };

    const unassignCustomer = (campaignCustomerId: number) => {
        setCustomers(prev => prev.map(customer => 
            customer.campaignCustomerId === campaignCustomerId 
                ? {...customer, campaignCustomerId: undefined, inCampaign: false, stage: undefined, stagePoint: undefined} 
                : customer
        ));
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
                                        stages={stages}
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

interface CustomerCardProps {
    customer: Customer;
    onStageChange: (customerId: number, stage: string) => void;
    onStagePointChange: (customerId: number, stagePoint: string) => void;
    onCampaignToggle: (campaignCustomerId: number) => void;
    onUnassign: (campaignCustomerId: number) => void;
    stages: Stage[];
}

const CustomerCard: React.FC<CustomerCardProps> = ({
    customer,
    onStageChange,
    onStagePointChange,
    onCampaignToggle,
    onUnassign,
    stages,
}) => {
    return (
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
                            {stages.map(stage => (
                                <SelectItem key={stage.id} value={stage.name}>{stage.name}</SelectItem>
                            ))}
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
                                {stages.find(s => s.name === customer.stage)?.steps.map(step => (
                                    <SelectItem key={step.id} value={step.name}>{step.name}</SelectItem>
                                ))}
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
};

interface UnassignedCustomerCardProps {
    customer: Customer;
    onAssign: (customerId: number, campaignId: number) => void;
}

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
    <Card className="mb-4 bg-gray-700 border-gray-700">
        <CardContent className="pt-6">
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-10 w-1/2 mt-4" />
        </CardContent>
    </Card>
);

export default withAuth(CustomerManagement);