import getConfig from 'next/config';

import type { OrganizationDTO } from '../../db';

import { axiosInstance } from '../constants';


const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/organizations`;

const OrganizationService = {
  getAll,
  getById,
  create,
  update,
  deleteAll,
  delete: _delete,
};

async function getAll() {
  return await axiosInstance.get<OrganizationDTO[]>(`${baseUrl}`);
}

async function getById(id: string) {
  return await axiosInstance.get<OrganizationDTO>(`${baseUrl}/${id}`);
}

async function create(data: any) {
  return await axiosInstance.post<OrganizationDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function update(data: any) {
  return await axiosInstance.put<OrganizationDTO>(`${baseUrl}/${data?.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function _delete(ids: string[]) {
  return await axiosInstance.delete<object>(`${baseUrl}`, {
    data: {
      ids: ids,
    },
  });
}

async function deleteAll() {
  return await axiosInstance.delete<OrganizationDTO>(`${baseUrl}`);
}

export default OrganizationService;