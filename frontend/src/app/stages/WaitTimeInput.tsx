// WaitTimeInput.tsx
import React, { useState } from 'react';

type WaitTimeInputProps = {
    selectedStep: Step;
    updateWaitTime: (stepId: number, waitTime: number) => void;
};

const WaitTimeInput: React.FC<WaitTimeInputProps> = ({ selectedStep, updateWaitTime }) => {
    const [waitTime, setWaitTime] = useState(selectedStep.wait_time);

    const handleWaitTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newWaitTime = parseInt(event.target.value, 10);
        setWaitTime(newWaitTime);
        updateWaitTime(selectedStep.id, newWaitTime);
    };

    return (
        <div className="mt-4">
            <label htmlFor="waitTime" className="block mb-2">
                Wait Time (seconds):
            </label>
            <input
                type="number"
                id="waitTime"
                value={waitTime}
                onChange={handleWaitTimeChange}
                className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default WaitTimeInput;