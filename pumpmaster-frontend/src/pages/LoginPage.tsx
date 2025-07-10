import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Link } from '@mui/material';
import { useUserStore } from '../stores/userStore.ts';
import LoginNavbar from '../components/NavBar.tsx';
import { post } from '../api/axios.ts';
// import usersData from '../assets/usersInformation.json';

export default function LoginPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    const res = await post('/auth/login', { username, password });
    console.log(res);
    if (res.status !== 200) {
        setError('Invalid username or password');
        return;
    }
    setUser({ username: res.data.username, token: res.data.token });
    navigate('/overview');
    
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', minWidth: '100vw' }}>
      <LoginNavbar showMenu={false}/>
      <div style={{
        maxWidth: '40%',
        margin: '20vh auto 0 auto',
        padding: '20px',
        borderRadius: '8px',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#000' }}>Welcome back</h2>

        <TextField
          label="Username"
          placeholder="Enter your username"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          placeholder="Enter your password"
          type="text"  
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
          onClick={handleLogin}
        >
          Log in
        </Button>

        <p style={{ textAlign: 'center', marginTop: '16px', color: '#000' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" underline="hover">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
