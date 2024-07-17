'use client';

import React, { useState } from 'react';
import { MdEmail, MdPhone, MdPerson, MdCalendarToday, MdBusiness } from 'react-icons/md';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const contactSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    company: Yup.string().required('Company is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    message: Yup.string().required('Preferred meeting date/time is required'),
    meetingDate: Yup.date().required('Meeting date is required').min(new Date(), 'Meeting date must be in the future'),
});

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        meetingDate: null as Date | null,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({ ...formData, meetingDate: date });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await contactSchema.validate(formData, { abortEarly: false });
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Thank you for your interest! We will be in touch soon to schedule a meeting.');
                setFormData({ name: '', company: '', email: '', phone: '', message: '', meetingDate: null });
                setErrors({});
            } else {
                toast.error('There was an error sending your message. Please try again later.');
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: { [key: string]: string } = {};
                error.inner.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path] = err.message;
                    }
                });
                setErrors(newErrors);
            } else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
            <Card className="w-full max-w-4xl bg-gray-800 text-gray-100 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Revolutionize Your Email Marketing with Drop Campaign
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-center">
                        Unleash the Power of Automated Drip Campaigns
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-lg mb-4">
                            Drop Campaign is the ultimate email automation management system designed to streamline your marketing efforts and boost conversions. Our cutting-edge software enables you to create highly targeted and personalized drip campaigns that nurture your leads and drive customer engagement.
                        </p>
                        <ul className="list-disc list-inside mb-4 text-gray-300">
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
                        <h3 className="text-2xl font-bold mb-4">Request a Meeting</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name" className="flex items-center text-gray-300 mb-2">
                                    <MdPerson className="mr-2" />
                                    Name
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-gray-700 border-gray-600 text-gray-200"
                                    required
                                />
                                {errors.name && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <span>{errors.name}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="company" className="flex items-center text-gray-300 mb-2">
                                    <MdBusiness className="mr-2" />
                                    Company
                                </Label>
                                <Input
                                    type="text"
                                    id="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="bg-gray-700 border-gray-600 text-gray-200"
                                    required
                                />
                                {errors.company && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <span>{errors.company}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="email" className="flex items-center text-gray-300 mb-2">
                                    <MdEmail className="mr-2" />
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-700 border-gray-600 text-gray-200"
                                    required
                                />
                                {errors.email && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <span>{errors.email}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="phone" className="flex items-center text-gray-300 mb-2">
                                    <MdPhone className="mr-2" />
                                    Phone
                                </Label>
                                <Input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-gray-700 border-gray-600 text-gray-200"
                                />
                                {errors.phone && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <span>{errors.phone}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="message" className="flex items-center text-gray-300 mb-2">
                                    <MdCalendarToday className="mr-2" />
                                    Preferred Meeting Date
                                </Label>
                                <DatePicker
                                    selected={formData.meetingDate}
                                    onChange={handleDateChange}
                                    className="w-full bg-gray-700 border-gray-600 text-gray-200"
                                    required
                                />
                                {errors.meetingDate && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <span>{errors.meetingDate}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="message" className="flex items-center text-gray-300 mb-2">
                                    <MdCalendarToday className="mr-2" />
                                    Additional Message
                                </Label>
                                <Textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="bg-gray-700 border-gray-600 text-gray-200"
                                    required
                                />
                                {errors.message && (
                                    <div className="flex items-center mt-1 text-red-500 text-sm">
                                        <span>{errors.message}</span>
                                    </div>
                                )}
                            </div>
                            <CardFooter className="text-muted">
                                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                    Request Meeting
                                </Button>
                            </CardFooter>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Contact;