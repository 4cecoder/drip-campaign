// src/app/customers/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import withAuth from "@/app/util/withAuth";
import {
    fetchCustomers,
    updateCustomer,
    deleteCustomer,
    createCustomer
} from './customersUtil';

type Customer = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
};

type CustomerCardProps = {
    customer: Customer;
    onUpdate: (customerId: number, updatedData: Partial<Customer>) => void;
    onDelete: (customerId: number) => void;
    editing: boolean;
    setEditing: (customer: Customer | null) => void;
};

const CustomerManagement: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customers = await fetchCustomers();
                setCustomers(customers);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async (customerId: number, updatedData: Partial<Customer>) => {
        try {
            await updateCustomer(customerId, updatedData);
            setCustomers(customers.map(customer => customer.id === customerId ? { ...customer, ...updatedData } : customer));
            setEditingCustomer(null);
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleDelete = async (customerId: number) => {
        try {
            await deleteCustomer(customerId);
            setCustomers(customers.filter(customer => customer.id !== customerId));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const createdCustomer = await createCustomer(newCustomer);
            setCustomers([...customers, createdCustomer]);
            setNewCustomer({
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
            });
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white px-4 py-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Customer Management
                </h1>
                <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg">
                    <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Customers
                    </h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Add New Customer</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="bg-gray-800 rounded p-2"
                                value={newCustomer.first_name}
                                onChange={e => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="bg-gray-800 rounded p-2"
                                value={newCustomer.last_name}
                                onChange={e => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-gray-800 rounded p-2"
                                value={newCustomer.email}
                                onChange={e => setNewCustomer({ ...newCustomer, email: e.target.value })}
                            />
                            <input
                                type="tel"
                                placeholder="Phone (optional)"
                                className="bg-gray-800 rounded p-2"
                                value={newCustomer.phone}
                                onChange={e => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                            />
                            <button
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                                onClick={handleCreate}
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                Add Customer
                            </button>
                        </div>
                    </div>
                    {customers.map((customer) => (
                        <CustomerCard
                            key={customer.id}
                            customer={customer}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            editing={editingCustomer?.id === customer.id}
                            setEditing={setEditingCustomer}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onUpdate, onDelete, editing, setEditing }) => {
    const [editedCustomer, setEditedCustomer] = useState<Customer>(customer);

    const handleEdit = () => {
        setEditing(customer);
        setEditedCustomer(customer);
    };

    const handleCancelEdit = () => {
        setEditing(null);
    };

    const handleSaveEdit = () => {
        onUpdate(customer.id, editedCustomer);
    };

    if (editing) {
        return (
            <div className="bg-gray-800 rounded-lg p-4 shadow mb-4">
                <input
                    type="text"
                    placeholder="First Name"
                    className="bg-gray-700 rounded p-2 mb-2 w-full"
                    value={editedCustomer.first_name}
                    onChange={e => setEditedCustomer({ ...editedCustomer, first_name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    className="bg-gray-700 rounded p-2 mb-2 w-full"
                    value={editedCustomer.last_name}
                    onChange={e => setEditedCustomer({ ...editedCustomer, last_name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-700 rounded p-2 mb-2 w-full"
                    value={editedCustomer.email}
                    onChange={e => setEditedCustomer({ ...editedCustomer, email: e.target.value })}
                />
                <input
                    type="tel"
                    placeholder="Phone (optional)"
                    className="bg-gray-700 rounded p-2 mb-4 w-full"
                    value={editedCustomer.phone || ''}
                    onChange={e => setEditedCustomer({ ...editedCustomer, phone: e.target.value })}
                />
                <div className="flex justify-end">
                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200 mr-2"
                        onClick={handleSaveEdit}
                    >
                        Save
                    </button>
                    <button
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="text-lg font-bold">{customer.first_name} {customer.last_name}</h4>
                    <p>Email: {customer.email}</p>
                    {customer.phone && <p>Phone: {customer.phone}</p>}
                </div>
                <div>
                    <button
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded transition duration-200 mr-2"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                        Edit
                    </button>
                    <button
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        onClick={() => onDelete(customer.id)}
                    >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withAuth(CustomerManagement);