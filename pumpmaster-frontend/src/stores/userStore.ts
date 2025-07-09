import { create } from 'zustand';

interface UserState {
  username: string | null;
  token: string | null;
  setUser: (user: { username: string; token: string }) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  username: null,
  token: null,
  setUser: ({ username, token }) => {
    localStorage.setItem('access_token', token);
    set({ username, token });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    set({ username: null, token: null });
  },
}));