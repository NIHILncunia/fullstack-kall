import axios, { AxiosRequestConfig } from 'axios';

const baseUrl = '/json';

const config: AxiosRequestConfig = { baseURL: baseUrl, };
export const axiosInstance = axios.create(config);
