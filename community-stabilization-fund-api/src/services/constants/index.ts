import axios from 'axios';

export const ROUTES = {
  root: {
    PATH: '/',
    PAGE_TITLE: 'Community Stabilization Fund',
  },
  'form-responses': {
    PATH: '/form-responses',
    PAGE_TITLE: 'Form Responses',
  },
  checklists: {
    PATH: '/checklists',
    PAGE_TITLE: 'Checklists',
  },
  'rent-mortgage-utilities-support': {
    PATH: '/rent-mortgage-utilities-support',
    PAGE_TITLE: 'Rent Mortgage Utilities Support',
  },
  'volunteer-groceries-and-supplies': {
    PATH: '/forms/volunteers/groceries-and-supplies',
    PAGE_TITLE: 'Groceries and Supplies Volunteer Form',
  },
};

export const axiosInstance = axios.create({
  headers: {
    common: {
      // can be common or any other method
      authorization: '',
    },
  },
});
