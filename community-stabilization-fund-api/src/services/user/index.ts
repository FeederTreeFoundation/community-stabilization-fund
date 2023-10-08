import getConfig from 'next/config';
import Router from 'next/router';

import type { UserDTO } from '../../db';

import { axiosInstance } from '../constants';


const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/users`;

const UserService = {
  login,
  logout,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function login(apiUser: string, token: string) {
  const res = await axiosInstance.post<{ api_user_id: number, organization_id: number }>(
    `${publicRuntimeConfig?.apiUrl}/users/authenticate`,
    { apiUser, token }
  );

  if(res.data?.api_user_id) axiosInstance.defaults.headers.common['authorization'] = token;
  return res;
}

async function logout() {
  // WIP: Remove authorization token instead of user id
  sessionStorage.removeItem('api_user_id');
  Router.push('/admin/login');
}

async function create(body: any) {
  return await axiosInstance.post<UserDTO>(`${baseUrl}/users`, body);
}

async function getAll() {
  return await axiosInstance.get<UserDTO[]>(`${publicRuntimeConfig?.apiUrl}/users`);
}

async function getById(id: string) {
  return await axiosInstance.get<UserDTO>(
    `${publicRuntimeConfig?.apiUrl}/users/${id}`
  );
}

function update(id: string, body: any) {
  return axiosInstance.put<UserDTO>(`${baseUrl}/${id}`, body);
}

// // prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
  return axiosInstance.delete<UserDTO>(`${baseUrl}/${id}`);
}

export default UserService;
