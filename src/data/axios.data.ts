import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = '/json';

const config: AxiosRequestConfig = { baseURL: baseUrl, };
export const axiosInstance = axios.create(config);

const trueConfig: AxiosRequestConfig = { baseURL: 'http://localhost:8088', };
export const kallInstance = axios.create(trueConfig);
