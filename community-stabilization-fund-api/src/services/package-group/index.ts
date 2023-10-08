import getConfig from 'next/config';

import type { PackageGroupDTO } from '../../db';

import { axiosInstance } from '../constants';

const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/package-groups`;

const PackageGroupService = {
  getAll,
  create,
};

async function getAll(options?: any) {
  const { pagination: p } = options ?? {};
  const pagination = p ? JSON.parse(p) : null;

  return await axiosInstance.get<PackageGroupDTO[]>(`${baseUrl}`, {
    params: { pagination },
  });
}

async function create(data: any) {
  return await axiosInstance.post<PackageGroupDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default PackageGroupService;
