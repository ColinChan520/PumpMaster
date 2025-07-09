import { apiClient } from './axios';

export async function loginApi(username: string, password: string) {
  const res = await apiClient.post('/auth/login', { username, password });
  return res.data.token as string;
}

export async function registerApi(user: {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}) {
  await apiClient.post('/auth/register', user);
}