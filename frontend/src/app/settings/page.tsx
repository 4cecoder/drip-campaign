// app/settings/page.tsx
'use client';

import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

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
        <div className="bg-black min-h-screen text-white p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Settings
            </h2>
            <div className="max-w-lg mx-auto">
                <form className="bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
                    <h3 className="text-2xl font-bold mb-4">CRM Settings</h3>
                    <div className="mb-6">
                        <label htmlFor="crmSelect" className="block text-lg font-medium mb-2">
                            Select CRM
                        </label>
                        <select
                            id="crmSelect"
                            className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCRM}
                            onChange={(e) => setSelectedCRM(e.target.value as CRM)}
                        >
                            <option value="Enerflo">Enerflo</option>
                            <option value="HubSpot">HubSpot</option>
                            <option value="Salesforce">Salesforce</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="baseURL" className="block text-lg font-medium mb-2">
                            {selectedCRM} Base URL
                        </label>
                        <input
                            type="text"
                            id="baseURL"
                            className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={baseURL}
                            onChange={(e) => setBaseURL(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="apiKey" className="block text-lg font-medium mb-2">
                            {selectedCRM} API Key
                        </label>
                        <input
                            type="text"
                            id="apiKey"
                            className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 mt-8">Email Settings</h3>
                    <div className="mb-6">
                            <label htmlFor="pollingInterval" className="block text-lg font-medium mb-2">
                                Polling Interval (minutes)
                            </label>
                            <input
                                type="number"
                                id="pollingInterval"
                                className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                                value={pollingInterval}
                                onChange={(e) => setPollingInterval(Number(e.target.value))}
                            />
                        <label htmlFor="email" className="block text-lg font-medium mb-2">
                            Gmail Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="emailPassword" className="block text-lg font-medium mb-2">
                            Gmail Password
                        </label>
                        <input
                            type="password"
                            id="emailPassword"
                            className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={emailPassword}
                            onChange={(e) => setEmailPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg transition duration-200"
                        onClick={handleSaveClick}
                    >
                        <FontAwesomeIcon icon={faSave} className="mr-2" />
                        Save Settings
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;