import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useUserStore } from '../stores/userStore.ts';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ showMenu = false }: { showMenu?: boolean }) {
  const username = useUserStore((state) => state.username);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login')
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '20px',
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#000',
        borderBottom: '1px solid #ccc',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      
        <div style={{ fontWeight: 'bold', fontSize: '20px' }}>+ PumpMaster</div> 

      {showMenu && (
        <>
          <div style={{ display: 'flex', gap: '20px', paddingRight:"30%"}}>
            <a href="#" style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', textDecoration: 'none' }}>Dashboard</a>
            <a href="/overview" style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', textDecoration: 'none' }}>Pumps</a>
            <a href="#" style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', textDecoration: 'none' }}>Reports</a>
            <a href="#" style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', textDecoration: 'none' }}>Alerts</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            <SearchIcon />
            <CircleNotificationsIcon style={{ fontSize: '160%', color: '#000' }}></CircleNotificationsIcon>
            <span style={{ fontSize: '14px', color: '#000' }}>{username}</span>

            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              Logout
            </Button>

            <AccountCircleIcon style={{ fontSize: '32px', color: '#000' }} />
          </div>
        </>
      )}
    </div>
  );
}
