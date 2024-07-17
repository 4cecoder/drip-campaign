'use client';
import React, { useEffect, useState } from 'react';
import { MdEmail, MdAddCircle, MdCancel, MdSave } from 'react-icons/md';
import withAuth from "@/lib/withAuth";
import { fetchCustomers, updateCustomerSubscription, saveUnsubscribeTemplate } from './subscriptionsUtils';

const Subscriptions: React.FC = () => {
    const [emailSubscriptions, setEmailSubscriptions] = useState<Customer[]>([]);
    const [unsubscribeTemplate, setUnsubscribeTemplate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customers = await fetchCustomers();
                setEmailSubscriptions(customers);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchData();
    }, []);

    const toggleSubscription = async (id: number) => {
        try {
            await updateCustomerSubscription(id);
            setEmailSubscriptions(
                emailSubscriptions.map(customer =>
                    customer.id === id ? { ...customer, subscribed: !customer.subscribed } : customer
                )
            );
        } catch (error) {
            console.error('Error updating subscription status:', error);
        }
    };

    const handleSaveUnsubscribeTemplate = async () => {
        try {
            await saveUnsubscribeTemplate(unsubscribeTemplate);
            console.log('Unsubscribe template saved successfully');
        } catch (error) {
            console.error('Error saving unsubscribe template:', error);
        }
    };

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Manage Email Subscriptions
            </h2>
            <p className="mb-6 text-xl text-center">Search and manually manage customer E-Mail subscriptions for this system.</p>

            <div className="max-w-xl mx-auto">
                {emailSubscriptions.map(customer => (
                    <div key={customer.id} className="mb-4 bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
                        <div className="flex justify-between items-center">
                            <span>
                                <MdEmail className="inline mr-2" />
                                {customer.email}
                            </span>
                            <button
                                className={`px-4 py-2 text-sm font-bold rounded flex items-center ${customer.subscribed ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                                onClick={() => toggleSubscription(customer.id)}
                            >
                                {customer.subscribed ? <MdCancel className="mr-2" /> : <MdAddCircle className="mr-2" />}
                                {customer.subscribed ? 'Unsubscribe' : 'Subscribe'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="max-w-5xl mx-auto">
                <h3 className="text-xl font-bold mb-3 mt-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Unsubscribe Email Template
                </h3>
                <div className="mb-4 bg-black bg-opacity-50 rounded-lg shadow-md backdrop-filter backdrop-blur-lg border border-gray-700 flex">
                    <div className="w-1/2 p-4">
                        <textarea
                            className="w-full h-64 p-2 bg-gray-900 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={unsubscribeTemplate}
                            onChange={(e) => setUnsubscribeTemplate(e.target.value)}
                        />
                        <div className="flex justify-center mt-2">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                                onClick={handleSaveUnsubscribeTemplate}
                            >
                                <MdSave className="mr-2" />
                                Save Template
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2 p-4">
                        <div className="bg-gray-500 rounded overflow-auto max-h-[300px] max-w-[500px]">
                            <iframe
                                srcDoc={unsubscribeTemplate}
                                title="Unsubscribe Template Preview"
                                className="w-full h-64 rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Subscriptions);