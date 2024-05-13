// app/stages/EmailForm.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import DOMPurify from 'dompurify';

type Step = {
    id: string;
    name: string;
    emailSubject: string;
    emailTemplate: string;
    waitTime: number;
};

type EmailFormProps = {
    selectedStep: Step;
    setSelectedStep: (step: Step) => void;
    saveEmailSubjectAndTemplate: () => void;
};

const EmailForm: React.FC<EmailFormProps> = ({
                                                 selectedStep,
                                                 setSelectedStep,
                                                 saveEmailSubjectAndTemplate,
                                             }) => {
    return (
        <div>
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
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save
            </button>
            {selectedStep.emailTemplate.trim() !== '' && (
                <div className="mt-4">
                    <h4 className="text-xl font-bold mb-2">Preview:</h4>
                    <div className="bg-gray-900 p-4 rounded overflow-auto max-h-[300px] max-w-[500px]">
                        <p className="font-bold mb-2">
                            {DOMPurify.sanitize(selectedStep.emailSubject)}
                        </p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(selectedStep.emailTemplate),
                            }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailForm;