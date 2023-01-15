import axios from "axios";
import getConfig from "next/config";
import React from "react";

import type { FormResponse } from "../../db";
const { publicRuntimeConfig } = getConfig() || {};
const baseUrl = `${publicRuntimeConfig?.apiUrl}/form-responses`;

let instance = axios.create({
  headers: {
    common: {
      authorization: "",
    },
  },
});

const getAllFormResponses = async () => {
  const res = await instance.get<FormResponse[]>(`${baseUrl}`);
  return res;
};

const createFormResponse = async () => {
  const res = await instance.post<FormResponse>(`${baseUrl}`);
  return res;
};

const FormResponseServices = {
  getAllFormResponses,
  createFormResponse,
};
export default FormResponseServices;
