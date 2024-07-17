// EmailForm.tsx
import React, { useEffect, useState } from 'react';
import { MdSave } from 'react-icons/md';
import DOMPurify from 'dompurify';
import { fetchEmailTemplate, updateEmailTemplate } from './stagesUtils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { EmailTemplate } from '@/lib/campaignTypes';



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
        wait_time: 0,
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
                    wait_time: 0,
                });
            }
        };

        fetchTemplate();
    }, [selectedStep.email_template_id]);

    const handleSaveEmailTemplate = async () => {
        try {
            if (selectedStep.email_template_id) {
                const { id, created_at, updated_at, deleted_at, created_by, updated_by, ...updateData } = emailTemplate;
                // Convert wait_time from hours to seconds before saving
                const updatedData = {
                    ...updateData,
                    wait_time: updateData.wait_time * 3600 // Convert hours to seconds
                };
                await updateEmailTemplate(selectedStep.email_template_id, updatedData);
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
        <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
                <CardTitle className="text-white">Email Template</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label htmlFor="emailSubject" className="text-sm font-medium text-gray-300 mb-1 block">
                        Email Subject:
                    </label>
                    <Input
                        id="emailSubject"
                        value={emailTemplate.subject}
                        onChange={(e) =>
                            setEmailTemplate({
                                ...emailTemplate,
                                subject: e.target.value,
                            })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="emailBody" className="text-sm font-medium text-gray-300 mb-1 block">
                        Email Body:
                    </label>
                    <Textarea
                        id="emailBody"
                        value={emailTemplate.body}
                        onChange={(e) =>
                            setEmailTemplate({
                                ...emailTemplate,
                                body: e.target.value,
                            })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500"
                        rows={10}
                    />
                </div>
                <div>
                    <label htmlFor="waitTime" className="text-sm font-medium text-gray-300 mb-1 block">
                        Wait Time (hours):
                    </label>
                    <Input
                        id="waitTime"
                        type="number"
                        value={emailTemplate.wait_time / 3600} // Convert seconds to hours for display
                        onChange={(e) =>
                            setEmailTemplate({
                                ...emailTemplate,
                                wait_time: parseFloat(e.target.value) * 3600 // Convert hours to seconds when updating state
                            })
                        }
                        className="bg-gray-800 text-white border-gray-700 focus:ring-blue-500"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={handleSaveEmailTemplate}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <MdSave className="mr-2" />
                    Save
                </Button>
            </CardFooter>
            {emailTemplate.body.trim() !== '' && (
                <CardContent className="mt-4">
                    <h4 className="text-xl font-bold mb-2 text-white">Preview:</h4>
                    <Card className="bg-gray-800 border-gray-700 overflow-auto max-h-[300px]">
                        <CardContent>
                            <p className="font-bold mb-2 text-white">{DOMPurify.sanitize(emailTemplate.subject)}</p>
                            <div 
                                className="text-gray-300"
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(emailTemplate.body) }}
                            />
                        </CardContent>
                    </Card>
                </CardContent>
            )}
        </Card>
    );
};

export default EmailForm;