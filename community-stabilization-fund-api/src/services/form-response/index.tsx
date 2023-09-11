import getConfig from 'next/config';

import type {FormResponseDTO} from '../../db';

import {axiosInstance} from '../constants';

const {publicRuntimeConfig} = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/form-responses`;

const FormResponseService = {
  getAll,
  create,
  deleteAll,
  archive: archive,
  delete: _delete,
};

async function getAll() {
  return await axiosInstance.get<FormResponseDTO[]>(`${baseUrl}`);
}

async function create(data: any) {
  return await axiosInstance.post<FormResponseDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function archive(ids: string[]) {
  return await axiosInstance.delete<FormResponseDTO>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}
async function _delete(ids: string[]) {
  return await axiosInstance.delete<FormResponseDTO>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}

async function deleteAll() {
  return await axiosInstance.delete<FormResponseDTO>(`${baseUrl}`);
}

export default FormResponseService;
