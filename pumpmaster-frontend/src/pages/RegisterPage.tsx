import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Link } from '@mui/material';
import Navbar from '../components/NavBar.tsx';
import { post } from '../api/axios.ts';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');
    try {
      const res = await post('/auth/register', { firstName, lastName, address, phone, email, password });
      if (res.status !== 200) {
        setError('Registration failed');
        return;
      }
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Register failed');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', minWidth: '100vw' }}>
      
      <Navbar />

      <div style={{
        maxWidth: '400px',
        margin: '20vh auto 0 auto',  
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#000' }}>Create an account</h2>

        <TextField
          label="First Name (Username)"
          margin="normal"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          margin="normal"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Address"
          margin="normal"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          label="Phone"
          margin="normal"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          label="Email Address"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
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
          onClick={handleRegister}
        >
          Register
        </Button>

        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
