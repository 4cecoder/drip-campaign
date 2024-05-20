'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import withAuth from "@/app/util/withAuth";

const EmailUnsubscribe: React.FC = () => {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState<string>('');
    const [unsubscribeSuccess, setUnsubscribeSuccess] = useState<boolean>(false);

    useEffect(() => {
        const emailParam = searchParams.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [searchParams]);

    const handleUnsubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Send the email to the server for unsubscription when backend is ready
        console.log('Unsubscribing email:', email);
        setUnsubscribeSuccess(true);
    };

    return (
        <div className="bg-black min-h-screen text-white p-8 flex justify-center items-center">
            <div className="bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {unsubscribeSuccess
                        ? 'Unsubscribed Successfully'
                        : 'Unsubscribe from Emails'}
                </h2>
                {unsubscribeSuccess ? (
                    <p className="text-center">
                        You have successfully unsubscribed from our emails.
                    </p>
                ) : (
                    <form onSubmit={handleUnsubscribe}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-white">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition duration-200"
                        >
                            Unsubscribe
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default withAuth(EmailUnsubscribe);