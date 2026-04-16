import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (data) => API.post('/auth/login', data);
export const signupUser = (data) => API.post('/auth/signup', data);

export const getProjects = () => API.get('/projects');
export const createProject = (data) => API.post('/projects/create', data);

export const requestAccess = (projectId) => API.post('/requests/request', { projectId });
export const approveRequest = (requestId) => API.post('/requests/approve', { requestId });
export const denyRequest = (requestId) => API.post('/requests/deny', { requestId });
export const getRequests = () => API.get('/requests');

export const getUsers = () => API.get('/test');

export default API;
