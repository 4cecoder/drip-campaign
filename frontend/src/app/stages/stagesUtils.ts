// stagesUtils.ts
import { Stage, Step, EmailTemplate } from '@/lib/campaignTypes';
import { Endpoints } from '@/lib/endpoints';
import { get, post, put, del } from '../../lib/api';

export const fetchStages = async (): Promise<Stage[]> => {
    const response = await get(Endpoints.getStages);
    return response.data;
};

export const createStage = async (name: string): Promise<Stage> => {
    const response = await post(Endpoints.createStage, { name });
    return response.data;
};

export const updateStage = async (stageId: number, name: string): Promise<void> => {
    await put(Endpoints.updateStage(stageId), { name });
};

export const deleteStage = async (stageId: number): Promise<void> => {
    await del(Endpoints.deleteStage(stageId));
};

export const createStep = async (stageId: number, newStep: Omit<Step, 'id'>): Promise<Step> => {
    const response = await post(Endpoints.createStep, { StageID: stageId, ...newStep });
    return response.data;
};

export const fetchStep = async (stepId: number): Promise<Step> => {
    const response = await get(Endpoints.getStep(stepId));
    return response.data;
};

export const fetchEmailTemplate = async (emailTemplateId: number): Promise<EmailTemplate> => {
    const response = await get(Endpoints.getEmailTemplate(emailTemplateId));
    return response.data;
};

export const createEmailTemplate = async (
    stepId: number,
    newEmailTemplate: Pick<EmailTemplate, 'name' | 'subject' | 'body' | 'content_type'>
): Promise<EmailTemplate> => {
    const response = await post(Endpoints.createEmailTemplate, { ...newEmailTemplate });
    return response.data;
};

export const updateEmailTemplate = async (emailTemplateId: number, updatedData: Partial<EmailTemplate>): Promise<void> => {
    await put(Endpoints.updateEmailTemplate(emailTemplateId), updatedData);
};

export const updateStep = async (stepId: number, updatedData: Partial<Step>): Promise<void> => {
    await put(Endpoints.updateStep(stepId), updatedData);
};

export const deleteStep = async (stepId: number): Promise<void> => {
    await del(Endpoints.deleteStep(stepId));
};