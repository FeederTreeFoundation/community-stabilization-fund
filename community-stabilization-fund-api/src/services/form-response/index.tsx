import getConfig from 'next/config';

import { axiosInstance } from '../constants';

import type { FormResponse } from '../../db';

const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/form-responses`;
const formResResetUrl = `${publicRuntimeConfig?.apiUrl}/form-responses/reset-form-responses`;

const FormResponseService = {
  getAllFormResponses,
  createFormResponse,
  resetFormResponse,
};

async function getAllFormResponses() {
  const res = await axiosInstance.get<FormResponse[]>(`${baseUrl}`);
  return res;
}

async function createFormResponse() {
  const res = await axiosInstance.post<FormResponse>(`${baseUrl}`);
  return res;
}

async function resetFormResponse() {
  const res = await axiosInstance.post<FormResponse>(`${formResResetUrl}`);
  return res;
}

export default FormResponseService;
