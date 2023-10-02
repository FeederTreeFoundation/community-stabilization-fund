import getConfig from 'next/config';

import type { PackageItemDTO } from '../../db';

import { axiosInstance } from '../constants';

const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/package-items`;

const PackageItemService = {
  create,
};

async function create(data: any) {
  return await axiosInstance.post<PackageItemDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default PackageItemService;
