'use client';
import React, { useEffect, useState } from 'react';
import { Mail, Plus, X, Save, Search } from 'lucide-react';
import withAuth from "@/lib/withAuth";
import { Customer, fetchCustomers, updateCustomerSubscription, saveUnsubscribeTemplate } from './subscriptionsUtils';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from 'react-hot-toast';

const Subscriptions: React.FC = () => {
    const [emailSubscriptions, setEmailSubscriptions] = useState<Customer[]>([]);
    const [unsubscribeTemplate, setUnsubscribeTemplate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customers = await fetchCustomers();
                setEmailSubscriptions(customers);
            } catch (error) {
                console.error('Error fetching customers:', error);
                toast.error('Failed to fetch customers');
            }
        };

        fetchData();
    }, []);

    const toggleSubscription = async (id: number) => {
        try {
            await updateCustomerSubscription(id);
            setEmailSubscriptions(
                emailSubscriptions.map(customer =>
                    customer.id === id ? { ...customer, subscribed: !customer.subscribed } : customer
                )
            );
            toast.success('Subscription status updated');
        } catch (error) {
            console.error('Error updating subscription status:', error);
            toast.error('Failed to update subscription');
        }
    };

    const handleSaveUnsubscribeTemplate = async () => {
        try {
            await saveUnsubscribeTemplate(unsubscribeTemplate);
            toast.success('Unsubscribe template saved successfully');
        } catch (error) {
            console.error('Error saving unsubscribe template:', error);
            toast.error('Failed to save unsubscribe template');
        }
    };

    const filteredSubscriptions = emailSubscriptions.filter(customer =>
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-background text-foreground min-h-screen p-8 dark">
            <h2 className="text-4xl font-bold mb-8 text-center text-primary">
                Manage Email Subscriptions
            </h2>
            <p className="mb-6 text-xl text-center text-muted-foreground">
                Search and manually manage customer E-Mail subscriptions for this system.
            </p>

            <div className="max-w-xl mx-auto mb-6 relative">
                <Input
                    type="text"
                    placeholder="Search email contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10"
                />
                <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="max-w-xl mx-auto space-y-4">
                {filteredSubscriptions.map(customer => (
                    <Card key={customer.id}>
                        <CardContent className="flex justify-between items-center p-4">
                            <span className="flex items-center">
                                <Mail className="mr-2 text-primary" />
                                {customer.email}
                            </span>
                            <Button
                                variant={customer.subscribed ? "destructive" : "default"}
                                size="sm"
                                onClick={() => toggleSubscription(customer.id)}
                            >
                                {customer.subscribed ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                                {customer.subscribed ? 'Unsubscribe' : 'Subscribe'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="max-w-5xl mx-auto mt-8">
                <h3 className="text-xl font-bold mb-3 text-center text-primary">
                    Unsubscribe Email Template
                </h3>
                <Card>
                    <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/2">
                            <Textarea
                                className="w-full h-64"
                                value={unsubscribeTemplate}
                                onChange={(e) => setUnsubscribeTemplate(e.target.value)}
                                placeholder="Enter unsubscribe template here..."
                            />
                            <div className="flex justify-center mt-2">
                                <Button
                                    onClick={handleSaveUnsubscribeTemplate}
                                    className="mt-2"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Template
                                </Button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="bg-muted rounded overflow-auto h-64">
                                <iframe
                                    srcDoc={unsubscribeTemplate}
                                    title="Unsubscribe Template Preview"
                                    className="w-full h-full rounded"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default withAuth(Subscriptions);