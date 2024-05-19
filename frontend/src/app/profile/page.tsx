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
    const [logo, setLogo] = useState<File | null>(null);
    const [primaryColor, setPrimaryColor] = useState('#000000');
    const [secondaryColor, setSecondaryColor] = useState('#000000');
    const [gradientStart, setGradientStart] = useState('#000000');
    const [gradientEnd, setGradientEnd] = useState('#000000');
    const [products, setProducts] = useState('');
    const [missionStatement, setMissionStatement] = useState('');
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

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setLogo(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Handle form submission, including uploading the logo and setting the colors
        // For now, we'll just log the values
        console.log('Logo:', logo);
        console.log('Primary Color:', primaryColor);
        console.log('Secondary Color:', secondaryColor);
        console.log('Gradient Start:', gradientStart);
        console.log('Gradient End:', gradientEnd);
        console.log('Products:', products);
        console.log('Mission Statement:', missionStatement);
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
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Business Profile
                </h1>
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
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
                        <div className="md:col-span-2">
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
                        <div className="md:col-span-2">
                            <label htmlFor="logo" className="block mb-2 font-bold">
                                Logo:
                            </label>
                            <input
                                type="file"
                                id="logo"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="products" className="block mb-2 font-bold">
                                Products:
                            </label>
                            <textarea
                                id="products"
                                value={products}
                                onChange={(e) => setProducts(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="missionStatement" className="block mb-2 font-bold">
                                Mission Statement:
                            </label>
                            <textarea
                                id="missionStatement"
                                value={missionStatement}
                                onChange={(e) => setMissionStatement(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-bold mb-4">Color Scheme</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="primaryColor" className="block mb-2 font-bold">
                                        Primary Color:
                                    </label>
                                    <input
                                        type="color"
                                        id="primaryColor"
                                        value={primaryColor}
                                        onChange={(e) => setPrimaryColor(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="secondaryColor" className="block mb-2 font-bold">
                                        Secondary Color:
                                    </label>
                                    <input
                                        type="color"
                                        id="secondaryColor"
                                        value={secondaryColor}
                                        onChange={(e) => setSecondaryColor(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gradientStart" className="block mb-2 font-bold">
                                        Gradient Start:
                                    </label>
                                    <input
                                        type="color"
                                        id="gradientStart"
                                        value={gradientStart}
                                        onChange={(e) => setGradientStart(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gradientEnd" className="block mb-2 font-bold">
                                        Gradient End:
                                    </label>
                                    <input
                                        type="color"
                                        id="gradientEnd"
                                        value={gradientEnd}
                                        onChange={(e) => setGradientEnd(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="px-6 py-3 mt-6 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Save Profile
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-8">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold mb-4 md:mb-0">{businessName}</h2>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <FontAwesomeIcon icon={faPencilAlt} className="mr-2"/>
                                Edit Profile
                            </button>
                        </div>
                        <p className="text-lg mb-8">{description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                                <p className="mb-2">
                                    <strong>Address:</strong> {address}
                                </p>
                                <p className="mb-2">
                                    <strong>Phone:</strong> {phone}
                                </p>
                                <p>
                                    <strong>Email:</strong> {email}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Website</h3>
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