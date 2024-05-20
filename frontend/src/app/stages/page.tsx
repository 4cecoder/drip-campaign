// app/stages/page.tsx
'use client';

import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EmailForm from "@/app/stages/EmailForm";
import StageComponent from "@/app/stages/Stage";
import WaitTimeInput from "@/app/stages/WaitTimeInput";
import withAuth from "@/app/util/withAuth";

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
type StageName = 'leads' | 'consultation' | 'proposal' | 'scheduled' | 'signing' | 'install' | 'maintenance';

const stageSteps: Record<StageName, string[]> = {
    leads: ['Identified', 'Contacted', 'Engaged'],
    consultation: ['Initial Meeting', 'Follow-up', 'Final Review'],
    proposal: ['Drafted', 'Sent', 'Revised'],
    scheduled: ['Appointment Set', 'Reminder Sent', 'Completed'],
    signing: ['Documents Prepared', 'Signing Underway', 'Signed'],
    install: ['Scheduled', 'In Progress', 'Finalized'],
    maintenance: ['Scheduled', 'In Progress', 'Completed']
};
const emailTemplates: Record<StageName, { subject: string; template: string; }[]> = {
    leads: [
        { subject: 'Introduction', template: 'Dear [Name], ...' },
        { subject: 'Follow-up', template: 'Dear [Name], ...' },
        { subject: 'Next Steps', template: 'Dear [Name], ...' },
    ],
    consultation: [
        { subject: 'Meeting Confirmation', template: 'Dear [Name], ...' },
        { subject: 'Follow-up Information', template: 'Dear [Name], ...' },
        { subject: 'Final Review', template: 'Dear [Name], ...' },
    ],
    proposal: [
        { subject: 'Proposal Draft', template: 'Dear [Name], ...' },
        { subject: 'Proposal Sent', template: 'Dear [Name], ...' },
        { subject: 'Revised Proposal', template: 'Dear [Name], ...' },
    ],
    scheduled: [
        { subject: 'Appointment Confirmation', template: 'Dear [Name], ...' },
        { subject: 'Appointment Reminder', template: 'Dear [Name], ...' },
        { subject: 'Appointment Completed', template: 'Dear [Name], ...' },
    ],
    signing: [
        { subject: 'Documents Ready', template: 'Dear [Name], ...' },
        { subject: 'Signing In Progress', template: 'Dear [Name], ...' },
        { subject: 'Signing Completed', template: 'Dear [Name], ...' },
    ],
    install: [
        { subject: 'Installation Scheduled', template: 'Dear [Name], ...' },
        { subject: 'Installation Progress', template: 'Dear [Name], ...' },
        { subject: 'Installation Completed', template: 'Dear [Name], ...' },
    ],
    maintenance: [
        { subject: 'Maintenance Scheduled', template: 'Dear [Name], ...' },
        { subject: 'Maintenance Progress', template: 'Dear [Name], ...' },
        { subject: 'Maintenance Completed', template: 'Dear [Name], ...' },
    ],
};

let stageId = 1;
let stepId = 1;

const initialStages: Stage[] = Object.entries(stageSteps).map(([stageName, stageSteps]) => {
    const stage: Stage = {
        id: `${stageId++}`,
        name: stageName.charAt(0).toUpperCase() + stageName.slice(1),
        steps: stageSteps.map((stageStep, index) => ({
            id: `${stageName}-${stepId++}`,
            name: stageStep,
            emailSubject: emailTemplates[stageName as StageName][index].subject,
            emailTemplate: emailTemplates[stageName as StageName][index].template,
            waitTime: 5,
        })),
    };
    return stage;
});

const Stages: React.FC = () => {
    const [stages, setStages] = useState<Stage[]>(initialStages);
    const [newStageName, setNewStageName] = useState('');
    const [newStepName, setNewStepName] = useState('');
    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);

    useEffect(() => {
        const savedStages = localStorage.getItem('stages');
        if (savedStages) {
            setStages(JSON.parse(savedStages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('stages', JSON.stringify(stages));
    }, [stages]);

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

export default withAuth(Stages);