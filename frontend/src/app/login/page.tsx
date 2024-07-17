'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, User, Lock } from "lucide-react";
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

// Mock user data for development
const mockUsers = [
    { username: 'user@example.com', password: 'password123' },
    { username: 'admin@example.com', password: 'admin123' },
];

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await loginSchema.validate({ username, password }, { abortEarly: false });
            
            // Mock authentication
            const user = mockUsers.find(u => u.username === username && u.password === password);
            if (user) {
                // Simulate storing a token
                window.localStorage.setItem("token", "mock-jwt-token");
                toast.success('Login successful!');
                router.push("/"); // Use router for navigation
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (e) {
            if (e instanceof Yup.ValidationError) {
                const newErrors: { [key: string]: string } = {};
                e.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors(newErrors);
            } else {
                console.error(e);
                toast.error('Invalid username or password');
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md">
                <Card className="bg-gray-800 border-gray-700 shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Login
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-center">
                            Enter your credentials to access the future
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-gray-300">Username</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <Input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={`pl-10 bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 ${errors.username ? 'border-red-500' : ''}`}
                                        placeholder="Enter your username"
                                    />
                                </div>
                                {errors.username && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <AlertCircle size={16} className="mr-1" />
                                        <span>{errors.username}</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-300">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`pl-10 bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                                        placeholder="Enter your password"
                                    />
                                </div>
                                {errors.password && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <AlertCircle size={16} className="mr-1" />
                                        <span>{errors.password}</span>
                                    </div>
                                )}
                            </div>
                            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{" "}
                            <a href="/signup" className="text-blue-400 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default Login;