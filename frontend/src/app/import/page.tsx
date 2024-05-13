// app/import/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import axios from 'axios';
import fuzzysort from 'fuzzysort';

type Customer = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    crmId: string;
};

interface CustomResult extends Fuzzysort.Result {
    obj: Fuzzysort.Prepared;
}
const extractCustomerInfo = (row: any): Partial<Customer> => {
    const columnNames = Object.keys(row).map((name) =>
        name.toLowerCase().replace(/[^a-z0-9]/g, '')
    );

    const fieldNames: Record<keyof Customer, string[]> = {
        firstName: ['first', 'name', 'fname', 'firstname', 'first-name'],
        lastName: ['last', 'name', 'lname', 'lastname', 'last-name'],
        phone: ['phone', 'mobile'],
        email: ['email'],
        crmId: ['id', 'crmid'],
    };

    const customer: Partial<Customer> = {};

    for (const [field, keys] of Object.entries(fieldNames)) {
        const normalizedKeys = keys.map((key) => fuzzysort.prepare(key.toLowerCase().replace(/[^a-z0-9]/g, '')));
        const matches = fuzzysort.go(field, normalizedKeys as Fuzzysort.Prepared[], { key: 'quality' });
        const bestMatch = matches[0];

        if (bestMatch) {
            const columnName = Object.keys(row).find(
                (key) => fuzzysort.prepare(key.toLowerCase().replace(/[^a-z0-9]/g, '')) === bestMatch.obj
            );
            if (columnName) {
                customer[field as keyof Customer] = row[columnName].trim();
            }
        }
    }

    return customer;
};


const toCustomerArray = (partialCustomers: Partial<Customer>[]): Customer[] => {
    return partialCustomers.map((partialCustomer) => ({
        firstName: partialCustomer.firstName || '',
        lastName: partialCustomer.lastName || '',
        phone: partialCustomer.phone || '',
        email: partialCustomer.email || '',
        crmId: partialCustomer.crmId || '',
    }));
};

const ImportPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target?.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(worksheet);

            const extractedCustomers: Partial<Customer>[] = parsedData.map(extractCustomerInfo);
            const customers = toCustomerArray(extractedCustomers);
            setCustomers(customers);
        };

        reader.readAsBinaryString(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const createCustomers = async () => {
        setIsUploading(true);
        const totalCustomers = customers.length;
        let createdCustomers = 0;

        for (const customer of customers) {
            try {
                await axios.post('/api/customers', customer);
                createdCustomers++;
                setUploadProgress(Math.round((createdCustomers / totalCustomers) * 100));
            } catch (error) {
                console.error('Error creating customer:', error);
            }
        }

        setIsUploading(false);
        setCustomers([]);
        setUploadProgress(0);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Import Customers</h1>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed border-gray-400 rounded-lg p-4 mb-4 ${
                    isDragActive ? 'bg-gray-100' : ''
                }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the file here...</p>
                ) : (
                    <p>Drag and drop a CSV or Excel file here, or click to select a file</p>
                )}
            </div>
            {customers.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Parsed Customers:</h2>
                    <table className="table-auto mb-4">
                        <thead>
                        <tr>
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">CRM ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{customer.firstName || ''}</td>
                                <td className="border px-4 py-2">{customer.lastName || ''}</td>
                                <td className="border px-4 py-2">{customer.phone || ''}</td>
                                <td className="border px-4 py-2">{customer.email || ''}</td>
                                <td className="border px-4 py -2">{customer.crmId || ''}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button
                        onClick={createCustomers}
                        disabled={isUploading}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        {isUploading ? 'Uploading...' : 'Create Customers'}
                    </button>
                    {isUploading && (
                        <div className="mt-4">
                            <p>Upload Progress: {uploadProgress}%</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImportPage;