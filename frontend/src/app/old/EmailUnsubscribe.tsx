// src/components/pages/EmailUnsubscribe.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EmailUnsubscribe: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [unsubscribeSuccess, setUnsubscribeSuccess] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [location.search]);

    const handleUnsubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Send the email to the server for unsubscription when backend is ready
        console.log('Unsubscribing email:', email);
        setUnsubscribeSuccess(true);
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-4 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Unsubscribe from Emails</h2>
                {unsubscribeSuccess ? (
                    <p>You have successfully unsubscribed from our emails.</p>
                ) : (
                    <form onSubmit={handleUnsubscribe}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-700 p-2 rounded w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Unsubscribe
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EmailUnsubscribe;