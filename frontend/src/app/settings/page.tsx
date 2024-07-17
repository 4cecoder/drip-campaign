'use client';

import React, {useEffect, useState} from 'react';
import { MdSave, MdEmail, MdLock, MdAccessTime, MdSettings, MdBusiness } from 'react-icons/md';
import withAuth from "@/lib/withAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CRM = 'Enerflo' | 'HubSpot' | 'Salesforce';

const Settings: React.FC = () => {
    const [selectedCRM, setSelectedCRM] = useState<CRM>('Enerflo');
    const [baseURL, setBaseURL] = useState<string>('https://enerflo.io/api');
    const [apiKey, setApiKey] = useState<string>('test-enerflo-api-key');
    const [email, setEmail] = useState<string>('test@gmail.com');
    const [emailPassword, setEmailPassword] = useState<string>('testpassword');
    const [pollingInterval, setPollingInterval] = useState<number>(15);
    useEffect(() => {
        switch (selectedCRM) {
            case 'Enerflo':
                setBaseURL('https://enerflo.io/api');
                setApiKey('test-enerflo-api-key');
                setEmail('test@gmail.com');
                setEmailPassword('testpassword');
                break;
            case 'HubSpot':
                setBaseURL('https://hubspot.io/api');
                setApiKey('test-hubspot-api-key');
                setEmail('test2@gmail.com');
                setEmailPassword('testpassword2');
                break;
            case 'Salesforce':
                setBaseURL('https://salesforce.io/api');
                setApiKey('test-salesforce-api-key');
                setEmail('test3@gmail.com');
                setEmailPassword('testpassword3');
                break;
        }
    }, [selectedCRM]);
    const handleSaveClick = () => {
        // TODO: Send updated settings to the server when API is ready
        console.log('Settings saved:', {
            selectedCRM,
            baseURL,
            apiKey,
            email,
            emailPassword,
            pollingInterval,
        });
        alert('Settings saved successfully!');
    };

    return (
        <div className="bg-gray-900 min-h-screen text-gray-300 p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                <MdSettings className="inline-block mr-2 mb-1" />
                Settings
            </h2>
            <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl text-blue-400">Application Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="crm" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                            <TabsTrigger value="crm" className="data-[state=active]:bg-gray-600 data-[state=active]:text-blue-400">
                                <MdBusiness className="inline-block mr-2 mb-1" />
                                CRM Settings
                            </TabsTrigger>
                            <TabsTrigger value="email" className="data-[state=active]:bg-gray-600 data-[state=active]:text-blue-400">
                                <MdEmail className="inline-block mr-2 mb-1" />
                                Email Settings
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="crm">
                            <div className="space-y-6 py-6">
                                <div className="space-y-2">
                                    <Label htmlFor="crmSelect" className="text-gray-400">Select CRM</Label>
                                    <Select value={selectedCRM} onValueChange={(value) => setSelectedCRM(value as CRM)}>
                                        <SelectTrigger id="crmSelect" className="bg-gray-700 border-gray-600 text-gray-200">
                                            <SelectValue placeholder="Select CRM" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-700 border-gray-600">
                                            <SelectItem value="Enerflo">Enerflo</SelectItem>
                                            <SelectItem value="HubSpot">HubSpot</SelectItem>
                                            <SelectItem value="Salesforce">Salesforce</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="baseURL" className="text-gray-400">{selectedCRM} Base URL</Label>
                                    <Input
                                        id="baseURL"
                                        value={baseURL}
                                        onChange={(e) => setBaseURL(e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="apiKey" className="text-gray-400">{selectedCRM} API Key</Label>
                                    <Input
                                        id="apiKey"
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-gray-200"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="email">
                            <div className="space-y-6 py-6">
                                <div className="space-y-2">
                                    <Label htmlFor="pollingInterval" className="flex items-center text-gray-400">
                                        <MdAccessTime className="mr-2 text-blue-400" />
                                        Polling Interval (minutes)
                                    </Label>
                                    <Input
                                        type="number"
                                        id="pollingInterval"
                                        value={pollingInterval}
                                        onChange={(e) => setPollingInterval(Number(e.target.value))}
                                        className="bg-gray-700 border-gray-600 text-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="flex items-center text-gray-400">
                                        <MdEmail className="mr-2 text-blue-400" />
                                        Gmail Email
                                    </Label>
                                    <Input
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-gray-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="emailPassword" className="flex items-center text-gray-400">
                                        <MdLock className="mr-2 text-blue-400" />
                                        Gmail Password
                                    </Label>
                                    <Input
                                        type="password"
                                        id="emailPassword"
                                        value={emailPassword}
                                        onChange={(e) => setEmailPassword(e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-gray-200"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="border-t border-gray-700 pt-6">
                    <Button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={handleSaveClick}
                    >
                        <MdSave className="mr-2" />
                        Save Settings
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default withAuth(Settings);