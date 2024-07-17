'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import EmailForm from './EmailForm';
import StageComponent from './Stage';
import WaitTimeInput from './WaitTimeInput';
import withAuth from '@/lib/withAuth';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Stage as ImportedStage, Step, EmailTemplate } from '@/lib/campaignTypes';

// Mock data generator for email templates
const generateMockEmailTemplates = (): EmailTemplate[] => [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Welcome to Our Service!',
    body: '<p>Dear {{customer_name}},</p><p>Welcome to our service! We\'re excited to have you on board.</p><p>Best regards,<br>The Team</p>',
    content_type: 'text/html',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: 1,
    updated_by: 1,
  },
  { id: 2, name: 'Schedule Call', subject: 'Let\'s Schedule a Call', body: '<p>Hello {{customer_name}},</p><p>We\'d love to schedule a call with you to discuss our services further. Please let us know your availability.</p><p>Best regards,<br>The Team</p>', content_type: 'text/html', created_at: new Date().toISOString(), updated_at: new Date().toISOString(), deleted_at: null, created_by: 1, updated_by: 1 },
  {
    id: 3,
    name: 'Needs Assessment',
    subject: 'Understanding Your Needs',
    body: '<p>Dear {{customer_name}},</p><p>To serve you better, we\'d like to understand your needs. Please fill out our questionnaire at the following link: {{questionnaire_link}}</p><p>Thank you,<br>The Team</p>',
    content_type: 'text/html',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: 1,
    updated_by: 1,
  },
  {
    id: 4,
    name: 'Proposal',
    subject: 'Our Proposal for You',
    body: '<p>Dear {{customer_name}},</p><p>Based on our understanding of your needs, we\'ve prepared a proposal for you. You can view it here: {{proposal_link}}</p><p>Looking forward to your feedback,<br>The Team</p>',
    content_type: 'text/html',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: 1,
    updated_by: 1,
  },
  {
    id: 5,
    name: 'Price Discussion',
    subject: 'Let\'s Discuss Pricing',
    body: '<p>Hello {{customer_name}},</p><p>We\'re ready to discuss pricing options that best suit your needs. Shall we schedule a call to go over the details?</p><p>Best regards,<br>The Team</p>',
    content_type: 'text/html',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: 1,
    updated_by: 1,
  },
  {
    id: 6,
    name: 'Contract Review',
    subject: 'Contract for Your Review',
    body: '<p>Dear {{customer_name}},</p><p>We\'ve prepared the contract for your review. You can access it here: {{contract_link}}</p><p>Please let us know if you have any questions or concerns.</p><p>Best regards,<br>The Team</p>',
    content_type: 'text/html',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: 1,
    updated_by: 1,
  },
];

// Mock data generator for stages
const generateMockStages = (emailTemplates: EmailTemplate[]): ImportedStage[] => {
  return [
    {
      id: 1,
      name: 'Initial Contact',
      steps: [
        { 
          id: 1, 
          name: 'Send Welcome Email', 
          stage_id: 1, 
          wait_time: 24, 
          email_template_id: 1,
          description: 'Automated welcome email to new leads',
          email_template: emailTemplates[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          created_by: 1,
          updated_by: 1
        },
        { 
          id: 2, 
          name: 'Schedule Call', 
          stage_id: 1, 
          wait_time: 48, 
          email_template_id: 2,
          description: 'Follow-up to schedule an introductory call',
          email_template: emailTemplates[1],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          created_by: 1,
          updated_by: 1
        },
      ],
      campaign_id: 1,
      description: 'Initial contact stage for new leads',
      order: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      created_by: 1,
      updated_by: 1,
    },
    {
      id: 2,
      name: 'Qualification',
      steps: [
        { 
          id: 3, 
          name: 'Assess Needs', 
          stage_id: 2, 
          wait_time: 72, 
          email_template_id: 3,
          description: 'Detailed needs assessment questionnaire',
          email_template: emailTemplates[2],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          created_by: 1,
          updated_by: 1
        },
        { 
          id: 4, 
          name: 'Send Proposal', 
          stage_id: 2, 
          wait_time: 24, 
          email_template_id: 4,
          description: 'Customized proposal based on needs assessment',
          email_template: emailTemplates[3],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          created_by: 1,
          updated_by: 1
        },
      ],
      campaign_id: 1,
      description: 'Qualification stage to assess lead fit',
      order: 2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      created_by: 1,
      updated_by: 1,
    },
    {
      id: 3,
      name: 'Negotiation',
      steps: [
        { 
          id: 5, 
          name: 'Price Discussion', 
          stage_id: 3, 
          wait_time: 48, 
          email_template_id: 5,
          description: 'Initiate pricing and terms negotiation',
          email_template: emailTemplates[4],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          created_by: 1,
          updated_by: 1
        },
        { 
          id: 6, 
          name: 'Contract Review', 
          stage_id: 3, 
          wait_time: 72, 
          email_template_id: 6,
          description: 'Send contract for client review',
          email_template: emailTemplates[5],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted_at: null,
          created_by: 1,
          updated_by: 1
        },
      ],
      campaign_id: 1,
      description: 'Negotiation stage for finalizing deals',
      order: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      created_by: 1,
      updated_by: 1,
    },
  ];
};

const Stages: React.FC = () => {
    const [stages, setStages] = useState<ImportedStage[]>([]);
    const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
    const [newStageName, setNewStageName] = useState('');
    const [newStepName, setNewStepName] = useState('');
    const [selectedStage, setSelectedStage] = useState<ImportedStage | null>(null);
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);

    useEffect(() => {
        // Generate mock email templates
        const mockEmailTemplates = generateMockEmailTemplates();
        setEmailTemplates(mockEmailTemplates);

        // Use mock data instead of fetching
        setStages(generateMockStages(mockEmailTemplates));
    }, []);

    const handleAddStage = () => {
        if (newStageName.trim() !== '') {
            const newStage: ImportedStage = {
                id: stages.length + 1,
                name: newStageName,
                steps: [],
                campaign_id: 1,
                description: '',
                order: stages.length + 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null,
                created_by: 1,
                updated_by: 1,
            };
            setStages([...stages, newStage]);
            setNewStageName('');
        }
    };

    const handleUpdateStageName = (stageId: number, newName: string) => {
        setStages(stages.map((stage) => 
            stage.id === stageId ? { ...stage, name: newName } : stage
        ));
    };

    const handleDeleteStage = (stageId: number) => {
        setStages(stages.filter((stage) => stage.id !== stageId));
    };

    const handleAddStep = (stageId: number) => {
        if (newStepName.trim() !== '') {
            const newStep: Step = {
                id: Math.max(...stages.flatMap(s => s.steps?.map(step => step.id) || [0])) + 1,
                name: newStepName,
                stage_id: stageId,
                wait_time: 0,
                email_template_id: 0,
                description: '',
                email_template: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                deleted_at: null,
                created_by: 1,
                updated_by: 1,
            };
            setStages(stages.map((stage) => 
                stage.id === stageId 
                    ? { ...stage, steps: [...(stage.steps || []), newStep] } 
                    : stage
            ));
            setNewStepName('');
        }
    };

    const handleDeleteStep = (stepId: number) => {
        setStages(stages.map((stage) => ({
            ...stage,
            steps: stage.steps?.filter((step) => step.id !== stepId) || null,
        })));
    };

    const handleUpdateWaitTime = (stepId: number, waitTime: number) => {
        setStages(stages.map((stage) => ({
            ...stage,
            steps: stage.steps?.map((step) => 
                step.id === stepId ? { ...step, wait_time: waitTime } : step
            ) || null,
        })));
    };

    const handleCreateEmailTemplate = async (stepId: number): Promise<EmailTemplate> => {
        const newTemplate: EmailTemplate = {
            id: emailTemplates.length + 1,
            name: 'New Template',
            subject: 'New Email Subject',
            body: '<p>New email body</p>',
            content_type: 'text/html',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: null,
            created_by: 1,
            updated_by: 1,
        };
        setEmailTemplates([...emailTemplates, newTemplate]);
        
        setStages(stages.map(stage => ({
            ...stage,
            steps: stage.steps?.map(step => 
                step.id === stepId 
                    ? { ...step, email_template_id: newTemplate.id, email_template: newTemplate }
                    : step
            ) || null,
        })));

        return newTemplate;
    };

    const handleUpdateEmailTemplate = async (stepId: number, updatedTemplate: Partial<EmailTemplate>): Promise<void> => {
        setEmailTemplates(emailTemplates.map(template => 
            template.id === updatedTemplate.id ? { ...template, ...updatedTemplate } : template
        ));

        setStages(stages.map(stage => ({
            ...stage,
            steps: stage.steps?.map(step => 
                step.id === stepId 
                    ? { ...step, email_template: { ...step.email_template, ...updatedTemplate } as EmailTemplate }
                    : step
            ) || null,
        })));
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto p-8 flex-grow">
                <h2 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Sales Stages
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
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
                                setNewStepName={setNewStepName}
                            />
                        ))}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="text"
                                        value={newStageName}
                                        onChange={(e) => setNewStageName(e.target.value)}
                                        placeholder="Enter new stage name"
                                        className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                                    />
                                    <Button onClick={handleAddStage} variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <Plus className="mr-2 h-4 w-4" /> Add Stage
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        {selectedStep && (
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-white">{selectedStep.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <EmailForm 
                                        selectedStep={selectedStep} 
                                        createEmailTemplate={handleCreateEmailTemplate}
                                        updateEmailTemplate={handleUpdateEmailTemplate}
                                    />
                                    <WaitTimeInput selectedStep={selectedStep} updateWaitTime={handleUpdateWaitTime} />
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withAuth(Stages);