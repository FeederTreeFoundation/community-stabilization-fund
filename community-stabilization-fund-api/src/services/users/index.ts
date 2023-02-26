import axios from 'axios';
import getConfig from 'next/config';
import Router from 'next/router';

import type { User } from '../../db';

const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/users`;

let instance = axios.create({
  headers: {
    common: {
      // can be common or any other method
      authorization: '',
    },
  },
});

const UserService = {
  login,
  logout,
  getAll,
  getById,
  update,
};

async function login(apiUser: string, token: string) {
  try {
    const res = await instance.post<{ id: number }>(
      `${publicRuntimeConfig?.apiUrl}/users/authenticate`,
      { apiUser, token }
    );
    instance.defaults.headers.common['authorization'] = token;
    localStorage.setItem('api_user', `${res.data.id}`);

    return res;
  } catch (error) {
    // WIP: Get error message and return it to Input
    console.log(error);
  }
}

// WIP: Remove authorization token instead of local storage
async function logout() {
  // remove user from local storage, publish null to user subscribers and redirect to login page
  localStorage.removeItem('api_user');
  // userSubject.next(null);
  Router.push('/admin/login');
}

//WIP
// function createUser(user: string) {
//     return axios.post(`${baseUrl}`, user);
// }

async function getAll() {
  return await instance.get<User[]>(`${publicRuntimeConfig?.apiUrl}/users`);
}

async function getById(id: string) {
  return await instance.get<User[]>(
    `${publicRuntimeConfig?.apiUrl}/users/${id}`
  );
}

function update(id: string, params: any) {
  return instance.put(`${baseUrl}/${id}`, params);
}

// // prefixed with underscored because delete is a reserved word in javascript
// function _delete(id: string) {
//     return axios.delete(`${baseUrl}/${id}`);
// }

export default UserService;
