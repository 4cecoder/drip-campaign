'use client';

import React, { useState } from 'react';
// import { post } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, User, Lock, Mail } from "lucide-react";
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

const signupSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await signupSchema.validate(formData, { abortEarly: false });
            // Here you would typically send the form data to your backend
            console.log('Form data:', formData);
            toast.success('Signup successful!');
            // Reset form fields
            setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            setErrors({});
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
                toast.error('An error occurred during signup');
            }
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md">
                <Card className="bg-gray-800 border-gray-700 shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Sign Up
                        </CardTitle>
                        <CardDescription className="text-gray-400 text-center">
                            Create an account to get started
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
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleChange}
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
                                <Label htmlFor="email" className="text-gray-300">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`pl-10 bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {errors.email && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <AlertCircle size={16} className="mr-1" />
                                        <span>{errors.email}</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-300">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
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
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`pl-10 bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                        placeholder="Confirm your password"
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <AlertCircle size={16} className="mr-1" />
                                        <span>{errors.confirmPassword}</span>
                                    </div>
                                )}
                            </div>
                            <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
                                Sign Up
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-400">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-400 hover:underline">
                                Log in
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default withAuth(Signup, true);