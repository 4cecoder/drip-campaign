'use client';

import React, { useState } from 'react';
import { CalendarIcon, ClockIcon, UserIcon, CheckIcon, XIcon } from 'lucide-react';
import withAuth from "@/lib/withAuth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Task = {
    id: number;
    content: string;
    dueDate: string;
    dueTime: string;
    createdDate: string;
    userId: number;
    userName: string;
    creatorId: number;
    creatorName: string;
    customerId: number;
    customerName: string;
    completed: boolean;
};

const initialTasks: Task[] = [
    {
        id: 1,
        content: 'Finalize proposal for Solar Panel Installation',
        dueDate: '2023-09-15',
        dueTime: '15:00',
        createdDate: '2023-09-01',
        userId: 101,
        userName: 'Alex Mercer',
        creatorId: 201,
        creatorName: 'Sarah Kerrigan',
        customerId: 301,
        customerName: 'Gordon Freeman',
        completed: false,
    },
    {
        id: 2,
        content: 'Schedule meeting with HVAC supplier',
        dueDate: '2023-09-20',
        dueTime: '10:30',
        createdDate: '2023-09-05',
        userId: 102,
        userName: 'Jim Raynor',
        creatorId: 202,
        creatorName: 'Nova Terra',
        customerId: 302,
        customerName: 'Alyx Vance',
        completed: false,
    },
    // Add more fake tasks as needed
];

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto p-8">
                <h2 className="text-4xl font-bold mb-8 text-center">
                    Task Management
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tasks.map((task) => (
                        <Card key={task.id} className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-white">
                                    <CalendarIcon className="h-5 w-5" />
                                    <span>{task.content}</span>
                                </CardTitle>
                                <CardDescription className="flex items-center space-x-2 text-gray-400">
                                    <ClockIcon className="h-4 w-4" />
                                    <span>Due: {task.dueDate} at {task.dueTime}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-gray-300">
                                <div className="flex items-center space-x-2 mb-2">
                                    <UserIcon className="h-4 w-4" />
                                    <span>Assigned to: {task.userName}</span>
                                </div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <Avatar>
                                        <AvatarFallback>{task.customerName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span>Customer: {task.customerName}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Avatar>
                                        <AvatarFallback>{task.creatorName[0]}</AvatarFallback>
                                    </Avatar>
                                    <span>Created by: {task.creatorName} on {task.createdDate}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <Badge variant={task.completed ? "secondary" : "default"}>
                                    {task.completed ? 'Completed' : 'In Progress'}
                                </Badge>
                                <Button
                                    variant={task.completed ? "destructive" : "default"}
                                    onClick={() => toggleTaskCompletion(task.id)}
                                >
                                    {task.completed ? <XIcon className="mr-2 h-4 w-4" /> : <CheckIcon className="mr-2 h-4 w-4" />}
                                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default withAuth(Tasks);