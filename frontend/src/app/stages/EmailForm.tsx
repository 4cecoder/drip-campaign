// EmailForm.tsx
import React, { useEffect, useState } from 'react';
import { MdSave } from 'react-icons/md';
import DOMPurify from 'dompurify';
import { fetchEmailTemplate, updateEmailTemplate } from './stagesUtils';

interface EmailTemplate {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name: string;
    subject: string;
    body: string;
    content_type: string;
    created_by: number | null;
    updated_by: number | null;
}

type EmailFormProps = {
    selectedStep: Step;
    createEmailTemplate: (stepId: number) => Promise<EmailTemplate>;
};

const EmailForm: React.FC<EmailFormProps> = ({ selectedStep, createEmailTemplate }) => {
    const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>({
        id: 0,
        created_at: '',
        updated_at: '',
        deleted_at: null,
        name: '',
        subject: '',
        body: '',
        content_type: '',
        created_by: null,
        updated_by: null,
    });

    useEffect(() => {
        const fetchTemplate = async () => {
            if (selectedStep.email_template_id) {
                try {
                    const template = await fetchEmailTemplate(selectedStep.email_template_id);
                    setEmailTemplate(template as EmailTemplate);
                } catch (error) {
                    console.error('Error fetching email template:', error);
                }
            } else {
                setEmailTemplate({
                    id: 0,
                    created_at: '',
                    updated_at: '',
                    deleted_at: null,
                    name: '',
                    subject: '',
                    body: '',
                    content_type: '',
                    created_by: null,
                    updated_by: null,
                });
            }
        };

        fetchTemplate();
    }, [selectedStep.email_template_id]);

    const handleSaveEmailTemplate = async () => {
        try {
            if (selectedStep.email_template_id) {
                const { id, created_at, updated_at, deleted_at, created_by, updated_by, ...updateData } = emailTemplate;
                await updateEmailTemplate(selectedStep.email_template_id, updateData);
                console.log('Email template updated successfully');
            } else {
                const newEmailTemplate = await createEmailTemplate(selectedStep.id);
                setEmailTemplate(newEmailTemplate);
                console.log('New email template created successfully');
            }
        } catch (error) {
            console.error('Error saving email template:', error);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <label htmlFor="emailSubject" className="block mb-2">
                    Email Subject:
                </label>
                <input
                    type="text"
                    id="emailSubject"
                    value={emailTemplate.subject}
                    onChange={(e) =>
                        setEmailTemplate({
                            ...emailTemplate,
                            subject: e.target.value,
                        })
                    }
                    className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="emailBody" className="block mb-2">
                    Email Body:
                </label>
                <textarea
                    id="emailBody"
                    value={emailTemplate.body}
                    onChange={(e) =>
                        setEmailTemplate({
                            ...emailTemplate,
                            body: e.target.value,
                        })
                    }
                    className="bg-gray-900 p-2 rounded w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={10}
                ></textarea>
            </div>
            <button
                onClick={handleSaveEmailTemplate}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200 flex items-center"
            >
                <MdSave className="mr-2" />
                Save
            </button>
            {emailTemplate.body.trim() !== '' && (
                <div className="mt-4">
                    <h4 className="text-xl font-bold mb-2">Preview:</h4>
                    <div className="bg-gray-900 p-4 rounded overflow-auto max-h-[300px] max-w-[500px]">
                        <p className="font-bold mb-2">{DOMPurify.sanitize(emailTemplate.subject)}</p>
                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(emailTemplate.body) }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailForm;