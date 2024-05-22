// src/app/contact/page.tsx

'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Thank you for your interest! We will be in touch soon to schedule a meeting.');
        } else {
            alert('There was an error sending your message. Please try again later.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md m-4">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Revolutionize Your Email Marketing with Drop Campaign
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Unleash the Power of Automated Drip Campaigns</h2>
                        <p className="text-lg mb-4">
                            Drop Campaign is the ultimate email automation management system designed to streamline your marketing efforts and boost conversions. Our cutting-edge software enables you to create highly targeted and personalized drip campaigns that nurture your leads and drive customer engagement.
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>Intuitive drag-and-drop campaign builder</li>
                            <li>Advanced segmentation and targeting options</li>
                            <li>Seamless integration with popular email providers</li>
                            <li>Real-time analytics and performance tracking</li>
                        </ul>
                        <p className="text-lg">
                            Take your email marketing to the next level with Drop Campaign. Contact our sales team today to schedule a demo and discover how our powerful automation tools can transform your business.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Request a Meeting</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-600">
                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-600">
                                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-600">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                    Preferred Meeting Date/Time
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
                            >
                                Request Meeting
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;