import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage';
import OverviewPage from './pages/OverviewPage';
import { useUserStore } from './stores/userStore';
import type { JSX } from 'react';
import RegisterPage from './pages/RegisterPage';
import PumpDetailPage from './pages/PumpDetailPage';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = useUserStore((state) => state.token) || localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" replace />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
      <Route path="/pump/:pumpId" element={<ProtectedRoute><PumpDetailPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);
