'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCalendarDay, faUser, faClock, faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
    // More fake tasks
];

const tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Task Management
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
                        <h4 className="text-lg font-bold flex items-center mb-2">
                            <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
                            {task.content}
                        </h4>
                        <p className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faClock} className="mr-2" />
                            Due: {task.dueDate} at {task.dueTime}
                        </p>
                        <p className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Assigned to: {task.userName}
                        </p>
                        <p className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                            Customer: {task.customerName}
                        </p>
                        <p className="flex items-center mb-4">
                            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                            Created by: {task.creatorName} on {task.createdDate}
                        </p>
                        <button
                            className={`px-4 py-2 rounded flex items-center justify-center ${task.completed ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                            onClick={() => toggleTaskCompletion(task.id)}
                        >
                            <FontAwesomeIcon icon={task.completed ? faTimesCircle : faCheckCircle} className="mr-2" />
                            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default tasks;