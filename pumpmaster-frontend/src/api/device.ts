// File: pumpmaster-frontend/src/api/device.ts
import { apiClient } from './axios';

export async function fetchDevices() {
  const res = await apiClient.get('/devices');
  return res.data;  
}