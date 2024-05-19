// app/profile/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const BusinessProfilePage = () => {
    const [businessName, setBusinessName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Simulating an API call with fake demo data
            const fakeData = {
                businessName: 'Acme Inc.',
                description: 'Leading provider of innovative solutions.',
                address: '123 Main St, City, Country',
                phone: '+1 123-456-7890',
                email: 'info@acmeinc.com',
                website: 'https://www.acmeinc.com',
            };

            // Simulating a delay to mimic an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setBusinessName(fakeData.businessName);
            setDescription(fakeData.description);
            setAddress(fakeData.address);
            setPhone(fakeData.phone);
            setEmail(fakeData.email);
            setWebsite(fakeData.website);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulating form submission with fake demo data
        console.log('Updated Business Profile:', {
            businessName,
            description,
            address,
            phone,
            email,
            website,
        });
        alert('Profile updated successfully');
        setIsEditing(false);
    };

    if (loading) {
        return <div className="text-white text-center mt-8">Loading...</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen text-white px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Business Profile
                </h1>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="businessName" className="block mb-2 font-bold">
                                Business Name:
                            </label>
                            <input
                                type="text"
                                id="businessName"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 font-bold">
                                Description:
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-2 font-bold">
                                Address:
                            </label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block mb-2 font-bold">
                                Phone:
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 font-bold">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="website" className="block mb-2 font-bold">
                                Website:
                            </label>
                            <input
                                type="url"
                                id="website"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-3 mt-6 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Save Profile
                        </button>
                    </form>
                ) : (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">{businessName}</h2>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
                                Edit Profile
                            </button>
                        </div>
                        <p className="text-lg mb-4">{description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                                <p>
                                    <strong>Address:</strong> {address}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {phone}
                                </p>
                                <p>
                                    <strong>Email:</strong> {email}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Website</h3>
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {website}
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessProfilePage;