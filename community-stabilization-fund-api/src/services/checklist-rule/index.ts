import getConfig from 'next/config';

import type { ChecklistRuleDTO } from '../../db';

import { axiosInstance } from '../constants';


const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/checklist-rules`;

const ChecklistRuleService = {
  getAllChecklistRules,
  createChecklistRule,
  updateChecklistRule,
  deleteAllChecklistRules,
  deleteChecklistRule,
};

async function getAllChecklistRules() {
  return await axiosInstance.get<ChecklistRuleDTO[]>(`${baseUrl}`);
}

async function createChecklistRule(data: any) {
  return await axiosInstance.post<ChecklistRuleDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function updateChecklistRule(data: any) {
  return await axiosInstance.put<ChecklistRuleDTO>(`${baseUrl}/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function deleteChecklistRule(ids: number[]) {
  return await axiosInstance.delete<object>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}

async function deleteAllChecklistRules() {
  return await axiosInstance.delete<ChecklistRuleDTO>(`${baseUrl}`);
}

export default ChecklistRuleService;