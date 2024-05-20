'use client';

import React, { useState } from 'react';
import withAuth from "@/app/util/withAuth";

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
    trackingLink?: string; // New property for emails link
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

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Email Tracking
            </h2>
            <div className="bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
                <table className="w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2">Recipient Email</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Timestamp</th>
                        <th className="px-4 py-2">Campaign Stage</th>
                        <th className="px-4 py-2">Campaign Step</th>
                        <th className="px-4 py-2">Tracking Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {emailEvents.map((event) => (
                        <tr key={event.id}>
                            <td className="border px-4 py-2">{event.recipientEmail}</td>
                            <td className="border px-4 py-2">{event.status}</td>
                            <td className="border px-4 py-2">{event.timestamp.toLocaleString()}</td>
                            <td className="border px-4 py-2">{event.campaignStage}</td>
                            <td className="border px-4 py-2">{event.campaignStep}</td>
                            <td className="border px-4 py-2">
                                {event.trackingLink ? (
                                    <a
                                        href={event.trackingLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        View
                                    </a>
                                ) : (
                                    '-'
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default  withAuth(EmailTracking);