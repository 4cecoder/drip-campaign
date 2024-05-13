// app/stages/page.tsx
'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EmailForm from "@/app/stages/EmailForm";
import StageComponent from "@/app/stages/Stage";
import WaitTimeInput from "@/app/stages/WaitTimeInput";

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
            setStages(
                stages.map((stage) =>
                    stage.id === selectedStage.id
                        ? {
                            ...stage,
                            steps: stage.steps.map((step) =>
                                step.id === selectedStep.id
                                    ? {
                                        ...step,
                                        emailSubject: selectedStep.emailSubject,
                                        emailTemplate: selectedStep.emailTemplate,
                                    }
                                    : step
                            ),
                        }
                        : stage
                )
            );
            localStorage.setItem('stages', JSON.stringify(stages));
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
                        <StageComponent
                            key={stage.id}
                            stage={stage}
                            updateStageName={updateStageName}
                            deleteStage={deleteStage}
                            addStep={addStep}
                            deleteStep={deleteStep}
                            setSelectedStage={setSelectedStage}
                            setSelectedStep={setSelectedStep}
                            newStepName={newStepName}
                            setNewStepName={setNewStepName}
                        />
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
                        <div className="bg-black bg-opacity-50 rounded-lg p-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
                            <h3 className="text-2xl font-bold mb-4">{selectedStep.name}</h3>
                            <EmailForm
                                selectedStep={selectedStep}
                                setSelectedStep={setSelectedStep}
                                saveEmailSubjectAndTemplate={saveEmailSubjectAndTemplate}
                            />
                            <WaitTimeInput
                                selectedStep={selectedStep}
                                setSelectedStep={setSelectedStep}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stages;