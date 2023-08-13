import getConfig from 'next/config';

import type { ChecklistRuleDTO } from '../../db';

import { axiosInstance } from '../constants';


const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/checklist-rules`;

const ChecklistRuleService = {
  getAll,
  create,
  update,
  deleteAll,
  delete: _delete,
};

async function getAll() {
  return await axiosInstance.get<ChecklistRuleDTO[]>(`${baseUrl}`);
}

async function create(data: any) {
  return await axiosInstance.post<ChecklistRuleDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function update(data: any) {
  return await axiosInstance.put<ChecklistRuleDTO>(`${baseUrl}/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function _delete(ids: number[]) {
  return await axiosInstance.delete<object>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}

async function deleteAll() {
  return await axiosInstance.delete<ChecklistRuleDTO>(`${baseUrl}`);
}

export default ChecklistRuleService;