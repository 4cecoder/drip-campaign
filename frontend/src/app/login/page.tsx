// src/app/login/page.tsx
'use client';

import React, { useState } from 'react';
import {post} from "@/app/util/api";
import withAuth from "@/app/util/withAuth";
import {redirect} from "next/navigation";

const testUsers = [
    { username: 'testuser', password: 'testpassword' },
    { username: 'admin', password: 'adminpassword' },
];

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        try {
            let res = await post("login", {
                email: username,
                password: password
            })
            window.localStorage.setItem("token",res.data.token);
           window.location.replace("/")
        } catch (e) {
           console.error(e)
        }
    };

    if (isAuthenticated) {
        return (
            <div className="bg-black min-h-screen text-white p-8">
                <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Welcome!
                </h2>
                <p className="text-xl text-center">You are now authenticated.</p>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Login
            </h2>
            {errorMessage && (
                <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
            )}
            <form
                onSubmit={handleSubmit}
                className="bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700 max-w-md w-full"
            >
                <div className="mb-4">
                    <label htmlFor="username" className="block text-white mb-2">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg -blue-700 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default withAuth(Login, true);