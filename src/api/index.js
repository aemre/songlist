import axios from 'axios';
const baseUrl = 'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/';

const api = axios.create({
  baseURL: baseUrl
});

// Add a request interceptor
api.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log('config', config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, function (error) {
  console.log('error', error)
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default api;

