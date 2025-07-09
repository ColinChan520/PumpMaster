// import axios from 'axios';
import { mockFetch } from '../mocks/mockMiddleware';

// export const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, 
//   timeout: 8000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`,
//   },
// });

// export default apiClient;

export async function get(url: string) {
  return await mockFetch(url, 'GET') ;
}

export async function post(url: string, body: any) {
  return await mockFetch(url, 'POST', body);
}

export async function put(url: string, body: any) {
  return await mockFetch(url, 'PUT', body);
}

export async function deleteReq(url: string, body: any) {
  return await mockFetch(url, 'DELETE', body);
}


