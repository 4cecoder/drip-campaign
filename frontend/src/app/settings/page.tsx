// app/settings/page.tsx
'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

type CRM = 'Enerflo' | 'HubSpot' | 'Salesforce';

const Settings: React.FC = () => {
    const [selectedCRM, setSelectedCRM] = useState<CRM>('Enerflo');
    const [pollingInterval, setPollingInterval] = useState<number>(50);
    const [baseURL, setBaseURL] = useState<string>('https://enerflo.io/api');
    const [apiKey, setApiKey] = useState<string>('test-enerflo-api-key');
    const [username, setUsername] = useState<string>('test@example.com');
    const [password, setPassword] = useState<string>('testpassword');

    const handleSaveClick = () => {
        // TODO: Send updated settings to the server when API is ready
        console.log('Settings saved:', {
            selectedCRM,
            pollingInterval,
            baseURL,
            apiKey,
            username,
            password,
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
                        <label htmlFor="pollingInterval" className="block text-lg font-medium mb-2">
                            Polling Interval (seconds)
                        </label>
                        <input
                            type="number"
                            id="pollingInterval"
                            className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={pollingInterval}
                            onChange={(e) => setPollingInterval(parseInt(e.target.value))}
                        />
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
                    <div className="mb-6">
                        <label htmlFor="username" className="block text-lg font-medium mb-2">
                            {selectedCRM} Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-8">
                        <label htmlFor="password" className="block text-lg font-medium mb-2">
                            {selectedCRM} Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-900 p-3 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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