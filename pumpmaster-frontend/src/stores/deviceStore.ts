import { create } from 'zustand';
import { fetchDevices } from '../api/device';

interface Device {
  id: number;
  name: string;
}

interface DeviceState {
  devices: Device[];
  loading: boolean;
  error: string | null;
  loadDevices: () => Promise<void>;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  loading: false,
  error: null,
  loadDevices: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchDevices();
      set({ devices: data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Load failed', loading: false });
    }
  },
}));