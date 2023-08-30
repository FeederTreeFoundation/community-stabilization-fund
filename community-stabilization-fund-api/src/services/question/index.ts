import getConfig from 'next/config';

import type { QuestionDTO } from '../../db';

import { axiosInstance } from '../constants';


const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/questions`;

const QuestionService = {
  getAll,
  create,
  update,
  deleteAll,
  delete: _delete,
};

async function getAll(options?: any) {
  const { pagination: p } = options ?? {};
  const pagination = p ? JSON.parse(p) : null;

  return await axiosInstance.get<QuestionDTO[]>(
    `${baseUrl}`,
    { params: { pagination }}
  );
}

async function create(data: any) {
  return await axiosInstance.post<QuestionDTO>(`${baseUrl}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function update(data: any) {
  return await axiosInstance.put<QuestionDTO>(`${baseUrl}/${data.id}`, data, {
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
  return await axiosInstance.delete<QuestionDTO>(`${baseUrl}`);
}

export default QuestionService;