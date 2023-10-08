import getConfig from 'next/config';

import type {FormDTO} from '../../db';

import {axiosInstance} from '../constants';

const {publicRuntimeConfig} = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/form`;

const FormService = {
  getAll,
  create,
  update: update,
  delete: _delete,
};

async function getAll() {
  return await axiosInstance.get<FormDTO[]>(`${baseUrl}`);
}

async function create(data: any) {
  return await axiosInstance.post<FormDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function update(ids: string[], body: any) {
  return await axiosInstance.put<FormDTO>(`${baseUrl}`, {
    ids: ids,
    ...body,
  });
}

async function _delete(ids: string[]) {
  return await axiosInstance.delete<FormDTO>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}

export default FormService;
