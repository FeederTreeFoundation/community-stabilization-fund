import React from "react";
import getConfig from 'next/config';
import Router from 'next/router';
import axios from "axios";

const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/users`;

let instance = axios.create({
    headers: {
      common: {        // can be common or any other method
        authorization: ''
      }
    }
  })

const UserService = {
    login,
    logout,
    getById
};

async function login(apiUser: string, token: string) {
    const res = await axios.post(`${publicRuntimeConfig?.apiUrl}/authenticate`, { apiUser, token });

    instance.defaults.headers.common['authorization'] = token;
    Router.push(`/login?apiKey=${apiUser}:${token}`, '/login');

    return res;
}

async function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    // userSubject.next(null);
    Router.push('/account/login');
}

// function createUser(user: string) {
//     return axios.post(`${baseUrl}`, user);
// }

// function getAll() {
//     return axios.get(baseUrl);
// }

async function getById(id: string) {
    console.log('authToken: ', instance.defaults.headers.common['authorization'])
    return instance.get(`${baseUrl}/${id}`);
}

// // function update(id: string, params: any) {
// //     return axios.put(`${baseUrl}/${id}`, params)
// //         .then(x => {
// //             // update stored user if the logged in user updated their own record
// //             if (id === userSubject.value.id) {
// //                 // update local storage
// //                 const user = { ...userSubject.value, ...params };
// //                 localStorage.setItem('user', JSON.stringify(user));

// //                 // publish updated user to subscribers
// //                 userSubject.next(user);
// //             }
// //             return x;
// //         });
// // }

// // prefixed with underscored because delete is a reserved word in javascript
// function _delete(id: string) {
//     return axios.delete(`${baseUrl}/${id}`);
// }

export default UserService;