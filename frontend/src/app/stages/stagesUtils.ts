// stagesUtils.ts
import { Endpoints } from '@/lib/endpoints';
import { get, post, put, del } from '../util/api';

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

export const createStep = async (stageId: number, newStep: Step): Promise<Step> => {
    const response = await post(Endpoints.createStep, { stageId, ...newStep });
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
    newEmailTemplate: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
): Promise<EmailTemplate> => {
    const response = await post(Endpoints.createEmailTemplate, { stepId, ...newEmailTemplate });
    return response.data;
}

export const updateEmailTemplate = async (emailTemplateId: number, updatedData: Partial<EmailTemplate>): Promise<void> => {
    await put(Endpoints.updateEmailTemplate(emailTemplateId), updatedData);
};

export const updateStep = async (stepId: number, updatedData: Partial<Step>): Promise<void> => {
    await put(Endpoints.updateStep(stepId), updatedData);
};

export const deleteStep = async (stepId: number): Promise<void> => {
    await del(Endpoints.deleteStep(stepId));
};