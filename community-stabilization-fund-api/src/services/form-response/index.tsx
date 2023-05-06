import getConfig from 'next/config';

import { axiosInstance } from '../constants';

import type { FormResponse } from '../../db';

const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/form-responses`;

const FormResponseService = {
  getAllFormResponses,
  createFormResponse,
  deleteAllFormResponses,
  deleteFormResponse,
};

async function getAllFormResponses() {
  return await axiosInstance.get<FormResponse[]>(`${baseUrl}`);
}

async function createFormResponse() {
  return await axiosInstance.post<FormResponse>(`${baseUrl}`);
}

async function deleteFormResponse(ids: number[]) {
  return await axiosInstance.delete<object>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}

async function deleteAllFormResponses() {
  return await axiosInstance.delete<FormResponse>(`${baseUrl}`);
}

export default FormResponseService;
