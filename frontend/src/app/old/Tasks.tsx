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

const TaskManagement: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const toggleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white p-4 ml-10 mt-10">
            <h2 className="text-2xl font-bold mb-4">Task Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-gray-800 rounded-lg p-4 shadow">
                        <h4 className="text-lg font-bold flex items-center">
                            <FontAwesomeIcon icon={faCalendarDay} className="mr-2" />
                            {task.content}
                        </h4>
                        <p className="flex items-center">
                            <FontAwesomeIcon icon={faClock} className="mr-2" />
                            Due: {task.dueDate} at {task.dueTime}
                        </p>
                        <p className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Assigned to: {task.userName}
                        </p>
                        <p className="flex items-center">
                            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                            Customer: {task.customerName}
                        </p>
                        <p className="flex items-center">
                            <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                            Created by: {task.creatorName} on {task.createdDate}
                        </p>
                        <button
                            className={`mt-4 p-2 rounded flex items-center justify-center ${task.completed ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
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

export default TaskManagement;
