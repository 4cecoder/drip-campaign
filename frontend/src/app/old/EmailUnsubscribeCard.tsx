// src/components/EmailUnsubscribeCard.tsx

import React from 'react';

const EmailUnsubscribeCard: React.FC = () => {
    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-md w-4/5 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Email Unsubscribe Process</h2>
            <ul className="list-disc pl-5 space-y-2">
                <li>Each email includes an unsubscribe link unique to the recipient. The link is structured as follows: <a href="/unsubscribe?email=test@email.com" className="text-blue-500 underline">isp-solar.com/unsubscribe?email=test@email.com</a></li>
                <li>Clicking the link directs the recipient to the unsubscribe page in the application. The email parameter in the URL is used to identify the recipient's email address.</li>
                <li>The unsubscribe page extracts the recipient's email address from the URL using the 'email' query parameter.</li>
                <li>The recipient confirms their email address and submits the form to unsubscribe.</li>
                <li>The application sends an unsubscribe request to the server with the recipient's email address.</li>
                <li>The server updates the recipient's subscription status to prevent future emails.</li>
                <li>This process helps maintain compliance with email regulations and improves deliverability by reducing the likelihood of our emails being marked as spam.</li>
            </ul>
        </div>
    );
};

export default EmailUnsubscribeCard;