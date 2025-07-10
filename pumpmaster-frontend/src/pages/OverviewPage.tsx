import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Paper, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import NavBar from '../components/NavBar.tsx';
import { mockFetch } from '../mocks/mockMiddleware.ts';

interface Pump {
  id: string;
  info: string;
}

const OverviewPage: React.FC = () => {
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch pumps data
    mockFetch('/pumps/get', 'GET')
      .then((res) => setPumps(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddPump = () => {
    const newPump: Pump = {
      id: `pump${pumps.length + 1}`,
      info: `Pump ${pumps.length + 1} details`,
    };
    mockFetch('/pumps/add', 'POST', newPump)
      .then(() => setPumps([...pumps, newPump]))
      .catch((err) => console.error(err));
  };

  const handleEditPump = (id: string) => {
    const updatedInfo = prompt('Enter new info:');
    if (updatedInfo) {
      mockFetch('/pumps/edit', 'PUT', { id, info: updatedInfo })
        .then(() => {
          setPumps((prevPumps) =>
            prevPumps.map((pump) => (pump.id === id ? { ...pump, info: updatedInfo } : pump))
          );
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDeletePump = (id: string) => {
    mockFetch('/pumps/delete', 'DELETE', { id })
      .then(() => {
        setPumps((prevPumps) => prevPumps.filter((pump) => pump.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const filteredPumps = pumps.filter((pump) =>
    pump.info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', minWidth: '100vw' }}>
      <NavBar showMenu={true} />
    </div>
      
    </>
  );
};

export default OverviewPage;
