// page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EmailForm from './EmailForm';
import StageComponent from './Stage';
import WaitTimeInput from './WaitTimeInput';
import withAuth from '@/app/util/withAuth';
import { fetchStages, createStage, updateStage, deleteStage, createStep, deleteStep, updateStep, createEmailTemplate } from './stagesUtils';

const Stages: React.FC = () => {
    const [stages, setStages] = useState<Stage[]>([]);
    const [newStageName, setNewStageName] = useState('');
    const [newStepName, setNewStepName] = useState('');
    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedStages = await fetchStages();
                setStages(fetchedStages);
            } catch (error) {
                console.error('Error fetching stages:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddStage = async () => {
        if (newStageName.trim() !== '') {
            try {
                const newStage = await createStage(newStageName);
                setStages([...stages, newStage]);
                setNewStageName('');
            } catch (error) {
                console.error('Error creating stage:', error);
            }
        }
    };

    const handleUpdateStageName = async (stageId: number, newName: string) => {
        try {
            await updateStage(stageId, newName);
            setStages(stages.map((stage) => (stage.id === stageId ? { ...stage, name: newName } : stage)));
        } catch (error) {
            console.error('Error updating stage name:', error);
        }
    };

    const handleDeleteStage = async (stageId: number) => {
        try {
            await deleteStage(stageId);
            setStages(stages.filter((stage) => stage.id !== stageId));
        } catch (error) {
            console.error('Error deleting stage:', error);
        }
    };

    const handleAddStep = async (stageId: number) => {
        if (newStepName.trim() !== '') {
            try {
                const newStep: Omit<Step, 'id'> = {
                    deleted_at: null,
                    stage_id: stageId,
                    name: newStepName,
                    description: '',
                    email_template_id: 0,
                    email_template: null,
                    wait_time: 0,
                };

                const createdStep = await createStep(stageId, newStep);
                setStages(
                    stages.map((stage) => {
                        if (stage.id === stageId) {
                            const updatedSteps = stage.steps ? [...stage.steps, createdStep] : [createdStep];
                            return { ...stage, steps: updatedSteps };
                        }
                        return stage;
                    })
                );
                setNewStepName('');
            } catch (error) {
                console.error('Error creating step:', error);
            }
        }
    };

    const handleDeleteStep = async (stageId: number, stepId: number) => {
        try {
            await deleteStep(stepId);
            setStages(
                stages.map((stage): Stage => {
                    if (stage.id === stageId) {
                        const updatedSteps = stage.steps?.filter((step) => step.id !== stepId) || [];
                        return { ...stage, steps: updatedSteps };
                    }
                    return stage;
                })
            );
        } catch (error) {
            console.error('Error deleting step:', error);
        }
    };

    const handleUpdateWaitTime = async (stepId: number, waitTime: number) => {
        try {
            await updateStep(stepId, { wait_time: waitTime });
            setStages(
                stages.map((stage) => ({
                    ...stage,
                    steps: stage.steps?.map((step) => (step.id === stepId ? { ...step, wait_time: waitTime } : step)) || [],
                }))
            );
        } catch (error) {
            console.error('Error updating wait time:', error);
        }
    };

    const handleCreateEmailTemplate = async (stepId: number): Promise<EmailTemplate> => {
        try {
            const newEmailTemplate: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> = {
                name: '',
                subject: '',
                body: '',
                content_type: 'text/html',
            };
            const createdEmailTemplate = await createEmailTemplate(stepId, newEmailTemplate);
            return createdEmailTemplate;
        } catch (error) {
            console.error('Error creating email template:', error);
            throw error;
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
                            updateStageName={handleUpdateStageName}
                            deleteStage={handleDeleteStage}
                            addStep={handleAddStep}
                            deleteStep={handleDeleteStep}
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
                                onClick={handleAddStage}
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
                            <EmailForm selectedStep={selectedStep} createEmailTemplate={handleCreateEmailTemplate} />
                            <WaitTimeInput selectedStep={selectedStep} updateWaitTime={handleUpdateWaitTime} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withAuth(Stages);