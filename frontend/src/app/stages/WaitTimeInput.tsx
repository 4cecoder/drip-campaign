// app/stages/WaitTimeInput.tsx
import React from 'react';

type Step = {
    id: string;
    name: string;
    emailSubject: string;
    emailTemplate: string;
    waitTime: number;
};

type WaitTimeInputProps = {
    selectedStep: Step;
    setSelectedStep: (step: Step) => void;
};

const WaitTimeInput: React.FC<WaitTimeInputProps> = ({ selectedStep, setSelectedStep }) => {
    return (
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
    );
};

export default WaitTimeInput;