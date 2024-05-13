'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlusCircle, faCheckCircle, faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons';

const Subscriptions: React.FC = () => {
    const [emailSubscriptions, setEmailSubscriptions] = useState([
        { id: 1, email: 'user@example.com', subscribed: true },
        { id: 2, email: 'anotheruser@example.com', subscribed: false },
    ]);

    const [potentialSubscribers, setPotentialSubscribers] = useState([
        { id: 3, email: 'newuser@example.com' },
        { id: 4, email: 'guest@example.com' },
    ]);

    const toggleSubscription = (id: number) => {
        setEmailSubscriptions(
            emailSubscriptions.map(sub =>
                sub.id === id ? { ...sub, subscribed: !sub.subscribed } : sub
            )
        );
    };

    const addSubscriber = (subscriber: { id: number; email: string }) => {
        setEmailSubscriptions([...emailSubscriptions, { ...subscriber, subscribed: true }]);
        setPotentialSubscribers(potentialSubscribers.filter(sub => sub.id !== subscriber.id));
    };

    const [unsubscribeTemplate, setUnsubscribeTemplate] = useState(`
        <p>Dear {{name}},</p>
        <p>You have been successfully unsubscribed from our email list.</p>
        <p>If you have any questions or concerns, please contact us.</p>
        <p>Best regards,<br>The Team</p>
    `);
    const saveUnsubscribeTemplate = () => {
        // TODO: Send the updated unsubscribe template to the server when backend is ready
        console.log('Saving unsubscribe template:', unsubscribeTemplate);
        // Display a success message or handle any errors
    };

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Manage Email Subscriptions
            </h2>
            <p className="mb-6 text-xl text-center">Search and manually manage customer E-Mail subscriptions for this system.</p>

            <div className="max-w-xl mx-auto">
                {emailSubscriptions.map(sub => (
                    <div key={sub.id} className="mb-4 bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
                        <div className="flex justify-between items-center">
                            <span>
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                {sub.email}
                            </span>
                            <button
                                className={`px-4 py-2 text-sm font-bold rounded flex items-center ${sub.subscribed ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                                onClick={() => toggleSubscription(sub.id)}
                            >
                                <FontAwesomeIcon icon={sub.subscribed ? faTimesCircle : faCheckCircle} className="mr-2" />
                                {sub.subscribed ? 'Unsubscribe' : 'Subscribed'}
                            </button>
                        </div>
                    </div>
                ))}

                <h3 className="text-xl font-bold mb-3 mt-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Add New Subscribers
                </h3>
                {potentialSubscribers.map(sub => (
                    <div key={sub.id} className="mb-4 bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700 flex justify-between items-center">
                        <span>
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            {sub.email}
                        </span>
                        <button
                            className="px-4 py-2 text-sm font-bold rounded bg-blue-600 hover:bg-blue-700 flex items-center"
                            onClick={() => addSubscriber(sub)}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                            Add
                        </button>
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
                                className="px-4 py -2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                                onClick={saveUnsubscribeTemplate}
                            >
                                <FontAwesomeIcon icon={faSave} className="mr-2" />
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

export default Subscriptions;