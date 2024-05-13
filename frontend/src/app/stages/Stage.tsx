// app/stages/Stage.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

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

type StageProps = {
    stage: Stage;
    updateStageName: (stageId: string, newName: string) => void;
    deleteStage: (stageId: string) => void;
    addStep: (stageId: string) => void;
    deleteStep: (stageId: string, stepId: string) => void;
    setSelectedStage: (stage: Stage) => void;
    setSelectedStep: (step: Step) => void;
    newStepName: string;
    setNewStepName: (name: string) => void;
};

const Stage: React.FC<StageProps> = ({
                                         stage,
                                         updateStageName,
                                         deleteStage,
                                         addStep,
                                         deleteStep,
                                         setSelectedStage,
                                         setSelectedStep,
                                         newStepName,
                                         setNewStepName,
                                     }) => {
    return (
        <div className="bg-black bg-opacity-50 rounded-lg p-6 mb-6 shadow-md backdrop-filter backdrop-blur-lg border border-gray-700">
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
    );
};

export default Stage;