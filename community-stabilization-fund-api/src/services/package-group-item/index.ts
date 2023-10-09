import getConfig from 'next/config';

import { axiosInstance } from '../constants';

const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/package-group-items`;

const PackageGroupItemService = {
  create,
};

async function create(data: any) {
  return await axiosInstance.post(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default PackageGroupItemService;
