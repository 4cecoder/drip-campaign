'use client';

import React, { useState } from 'react';
import withAuth from "@/lib/withAuth";
import { MdEmail, MdAccessTime, MdCampaign, MdLink, MdSearch, MdFilterList } from 'react-icons/md';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type EmailStatus = 'Sent' | 'Delivered' | 'Opened' | 'Clicked' | 'Unsubscribed';
type CampaignStage = 'Lead Generation' | 'Qualification' | 'Proposal' | 'Scheduled' | 'Signing' | 'Install' | 'Maintenance';
type CampaignStep = string;

interface EmailEvent {
    id: string;
    recipientEmail: string;
    status: EmailStatus;
    timestamp: Date;
    campaignStage: CampaignStage;
    campaignStep: CampaignStep;
    trackingLink?: string;
}

// Sample email events data
const sampleEmailEvents: EmailEvent[] = [
    {
        id: '1',
        recipientEmail: 'john@example.com',
        status: 'Sent',
        timestamp: new Date('2023-05-12T10:00:00Z'),
        campaignStage: 'Lead Generation',
        campaignStep: 'Attract',
        trackingLink: 'https://example.com/track/1',
    },
    {
        id: '2',
        recipientEmail: 'jane@example.com',
        status: 'Delivered',
        timestamp: new Date('2023-05-12T10:05:00Z'),
        campaignStage: 'Lead Generation',
        campaignStep: 'Capture',
        trackingLink: 'https://example.com/track/2',
    },
    // ... other events
];

const EmailTracking: React.FC = () => {
    const [emailEvents, setEmailEvents] = useState<EmailEvent[]>(sampleEmailEvents);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [showActive, setShowActive] = useState(false);
    const filterItems = Array.from(new Set(emailEvents.map(item => item.campaignStage)));

    const getStatusColor = (status: EmailStatus) => {
        switch (status) {
            case 'Sent': return 'bg-blue-500';
            case 'Delivered': return 'bg-green-500';
            case 'Opened': return 'bg-yellow-500';
            case 'Clicked': return 'bg-purple-500';
            case 'Unsubscribed': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const filteredRows = emailEvents.filter((event) => {
        const matchesQuery = event.recipientEmail.toLowerCase().includes(query.toLowerCase()) ||
            event.status.toLowerCase().includes(query.toLowerCase()) ||
            event.campaignStage.toLowerCase().includes(query.toLowerCase()) ||
            event.campaignStep.toLowerCase().includes(query.toLowerCase());
        
        const matchesFilter = filter === "all" || event.campaignStage === filter;
        const matchesActive = !showActive || event.status !== 'Unsubscribed';

        return matchesQuery && matchesFilter && matchesActive;
    });

    return (
        <div className="bg-gray-900 min-h-screen text-gray-100 p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                <MdEmail className="inline-block mr-2 mb-1" />
                Email Tracking
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search for..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10 bg-gray-800 border-gray-700 text-gray-100"
                        />
                    </div>
                </div>
                <div className="w-full md:w-64">
                    <Select onValueChange={(value) => setFilter(value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-100">
                            <SelectValue placeholder="Filter by Campaign Stage" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="all" className="text-gray-100">All Stages</SelectItem>
                            {filterItems.map((item) => (
                                <SelectItem key={item} value={item} className="text-gray-100">{item}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-md">
                    <Switch
                        id="show-active"
                        checked={showActive}
                        onCheckedChange={setShowActive}
                        className="bg-gray-600"
                    />
                    <Label htmlFor="show-active" className="text-gray-300">Show Active Only</Label>
                </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Recipient Email</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Campaign Stage</TableHead>
                            <TableHead>Campaign Step</TableHead>
                            <TableHead>Tracking Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRows.map((event: EmailEvent) => (
                            <TableRow key={event.id}>
                                <TableCell>{event.recipientEmail}</TableCell>
                                <TableCell>
                                    <Badge className={`${getStatusColor(event.status)}`}>
                                        {event.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <MdAccessTime className="inline-block mr-1" />
                                    {event.timestamp.toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <MdCampaign className="inline-block mr-1" />
                                    {event.campaignStage}
                                </TableCell>
                                <TableCell>{event.campaignStep}</TableCell>
                                <TableCell>
                                    {event.trackingLink ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="bg-gray-700 hover:bg-gray-600 text-blue-400 hover:text-blue-300 border-gray-600 hover:border-gray-500 transition-colors duration-200"
                                        >
                                            <a
                                                href={event.trackingLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center"
                                            >
                                                <MdLink className="mr-1" />
                                                View
                                            </a>
                                        </Button>
                                    ) : (
                                        '-'
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default withAuth(EmailTracking);