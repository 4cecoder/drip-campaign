// app/stages/page.tsx
'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';

type Step = {
    id: string;
    name: string;
    emailSubject: string;
    emailTemplate: string;
    waitTime: number;
};

type Stage = {
    id: string;
    name: string;
    steps: Step[];
};

const initialStages: Stage[] = [
    {
        id: '1',
        name: 'Lead Generation',
        steps: [
            { id: '1', name: 'Attract', emailSubject: 'Exciting Offer', emailTemplate: '<p>Hello {{name}},</p><p>We have an exciting offer for you!</p>', waitTime: 5 },
            { id: '2', name: 'Capture', emailSubject: 'Thank You', emailTemplate: '<p>Dear {{name}},</p><p>Thank you for your interest in our product.</p>', waitTime: 5 },
            { id: '3', name: 'Nurture', emailSubject: 'Tips & Tricks', emailTemplate: '<p>Hi {{name}},</p><p>We hope you\'re enjoying our product. Here are some tips to get the most out of it.</p>', waitTime: 5 },
        ],
    },
    {
        id: '2',
        name: 'Qualification',
        steps: [
            { id: '4', name: 'Identify', emailSubject: 'Potential Customer', emailTemplate: '<p>Hello {{name}},</p><p>We have identified you as a potential customer.</p>', waitTime: 5 },
            { id: '5', name: 'Assess', emailSubject: 'Needs Assessment', emailTemplate: '<p>Dear {{name}},</p><p>We would like to assess your needs and see how we can assist you.</p>', waitTime: 5 },
            { id: '6', name: 'Qualify', emailSubject: 'Product Fit', emailTemplate: '<p>Hi {{name}},</p><p>Based on our assessment, we believe our product is a great fit for you.</p>', waitTime: 5 },
        ],
    },
];

const Stages: React.FC = () => {
    const [stages, setStages] = useState<Stage[]>(() => {
        const savedStages = localStorage.getItem('stages');
        return savedStages ? JSON.parse(savedStages) : initialStages;
    });
    const [newStageName, setNewStageName] = useState('');
    const [newStepName, setNewStepName] = useState('');
    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);

    const addStage = () => {
        if (newStageName.trim() !== '') {
            const newStage: Stage = {
                id: Date.now().toString(),
                name: newStageName,
                steps: [],
            };
            setStages([...stages, newStage]);
            setNewStageName('');
        }
    };

    const updateStageName = (stageId: string, newName: string) => {
        setStages(
            stages.map((stage) =>
                stage.id === stageId ? { ...stage, name: newName } : stage
            )
        );
    };

    const deleteStage = (stageId: string) => {
        setStages(stages.filter((stage) => stage.id !== stageId));
    };

    const addStep = (stageId: string) => {
        if (newStepName.trim() !== '') {
            const newStep: Step = {
                id: Date.now().toString(),
                name: newStepName,
                emailSubject: '',
                emailTemplate: '',
                waitTime: 5,
            };
            setStages(
                stages.map((stage) =>
                    stage.id === stageId
                        ? { ...stage, steps: [...stage.steps, newStep] }
                        : stage
                )
            );
            setNewStepName('');
        }
    };

    const updateStepEmailSubject = (stageId: string, stepId: string, newEmailSubject: string) => {
        const sanitizedEmailSubject = DOMPurify.sanitize(newEmailSubject);
        setStages(
            stages.map((stage) =>
                stage.id === stageId
                    ? {
                        ...stage,
                        steps: stage.steps.map((step) =>
                            step.id === stepId ? { ...step, emailSubject: sanitizedEmailSubject } : step
                        ),
                    }
                    : stage
            )
        );
    };

    const updateStepWaitTime = (stageId: string, stepId: string, newWaitTime: number) => {
        setStages(
            stages.map((stage) =>
                stage.id === stageId
                    ? {
                        ...stage,
                        steps: stage.steps.map((step) =>
                            step.id === stepId ? { ...step, waitTime: newWaitTime } : step
                        ),
                    }
                    : stage
            )
        );
    };

    const updateStepEmailTemplate = (stageId: string, stepId: string, newEmailTemplate: string) => {
        const sanitizedEmailTemplate = DOMPurify.sanitize(newEmailTemplate);
        setStages(
            stages.map((stage) =>
                stage.id === stageId
                    ? {
                        ...stage,
                        steps: stage.steps.map((step) =>
                            step.id === stepId ? { ...step, emailTemplate: sanitizedEmailTemplate } : step
                        ),
                    }
                    : stage
            )
        );
        localStorage.setItem('stages', JSON.stringify(stages));
    };

    const deleteStep = (stageId: string, stepId: string) => {
        setStages(
            stages.map((stage) =>
                stage.id === stageId
                    ? {
                        ...stage,
                        steps: stage.steps.filter((step) => step.id !== stepId),
                    }
                    : stage
            )
        );
    };

    const saveEmailSubjectAndTemplate = () => {
        if (selectedStage && selectedStep) {
            updateStepEmailSubject(selectedStage.id, selectedStep.id, selectedStep.emailSubject);
            updateStepEmailTemplate(selectedStage.id, selectedStep.id, selectedStep.emailTemplate);
            updateStepWaitTime(selectedStage.id, selectedStep.id, selectedStep.waitTime);
        }
    };

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Sales Stages
            </h2>
            <div className="grid grid-cols-2 gap-8">
                <div className="col-span-1">
                    {stages.map((stage) => (
                        <div
                            key={stage.id}
                            className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <input
                                    type="text"
                                    value={stage.name}
                                    onChange={(e) => updateStageName(stage.id, e.target.value)}
                                    className="text-2xl font-bold bg-transparent focus:outline-none"
                                />
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition duration-200"
                                    onClick={() => deleteStage(stage.id)}
                                />
                            </div>
                            <ul className="ml-6 list-disc">
                                {stage.steps.map((step) => (
                                    <li
                                        key={step.id}
                                        className="mb-2 flex items-center cursor-pointer"
                                        onClick={() => {
                                            setSelectedStage(stage);
                                            setSelectedStep(step);
                                        }}
                                    >
                                        {step.name}
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className="ml-2 text-red-500 cursor-pointer hover:text-red-600 transition duration-200"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteStep(stage.id, step.id);
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center mt-4">
                                <input
                                    type="text"
                                    value={newStepName}
                                    onChange={(e) => setNewStepName(e.target.value)}
                                    className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter new step"
                                />
                                <button
                                    onClick={() => addStep(stage.id)}
                                    className="ml-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={newStageName}
                                onChange={(e) => setNewStageName(e.target.value)}
                                className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter new stage name"
                            />
                            <button
                                onClick={addStage}
                                className="ml-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200"
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-1">
                    {selectedStep && (
                        <div
                            className="bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
                            <h3 className="text-2xl font-bold mb-4">{selectedStep.name}</h3>
                            <div className="mb-4">
                                <label htmlFor="emailSubject" className="block mb-2">
                                    Email Subject:
                                </label>
                                <input
                                    type="text"
                                    id="emailSubject"
                                    value={selectedStep.emailSubject}
                                    onChange={(e) =>
                                        setSelectedStep({
                                            ...selectedStep,
                                            emailSubject: e.target.value,
                                        })
                                    }
                                    className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="emailTemplate" className="block mb-2">
                                    Email Template:
                                </label>
                                <textarea
                                    id="emailTemplate"
                                    value={selectedStep.emailTemplate}
                                    onChange={(e) =>
                                        setSelectedStep({
                                            ...selectedStep,
                                            emailTemplate: e.target.value,
                                        })
                                    }
                                    className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={10}
                                ></textarea>
                            </div>
                            <button
                                onClick={saveEmailSubjectAndTemplate}
                                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200"
                            >
                                <FontAwesomeIcon icon={faSave} className="mr-2"/>
                                Save
                            </button>
                            {selectedStep.emailTemplate.trim() !== '' && (
                                <div className="mt-4">
                                    <h4 className="text-xl font-bold mb-2">Preview:</h4>
                                    <div className="bg-gray-900 p-4 rounded overflow-auto max-h-[300px] max-w-[500px]">
                                        <p className="font-bold mb-2">{DOMPurify.sanitize(selectedStep.emailSubject)}</p>
                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedStep.emailTemplate) }}></div>
                                    </div>
                                </div>
                            )}


                            <div className="mb-4">
                                <label htmlFor="waitTime" className="block mb-2 mt-6">
                                    Wait Time (days):
                                </label>
                                <input
                                    type="number"
                                    id="waitTime"
                                    value={selectedStep.waitTime}
                                    onChange={(e) =>
                                        setSelectedStep({
                                            ...selectedStep,
                                            waitTime: parseInt(e.target.value),
                                        })
                                    }
                                    className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stages;