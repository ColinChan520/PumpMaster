import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { deleteReq, get, post, put } from '../api/axios';
import EditPumpModal, { type PumpData } from '../components/EditPumpModal';
import { useNavigate } from 'react-router-dom';


import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from '@mui/material';

const OverviewPage: React.FC = () => {
  const [pumps, setPumps] = useState<PumpData[]>([]);
  const [error, setError] = useState('');
  const [selectedPump, setSelectedPump] = useState<PumpData | null>(null);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const newPumpTemplate: PumpData = {
    id: Date.now().toString(),
    'Pump Name': '',
    'Type': '',
    'Area': '',
    'Latitude': '',
    'Longitude': '',
    'Flow Rate': '',
    'Offset': '',
    'Current Pressure': '',
    'Min Pressure': '',
    'Max Pressure': '',
  };

  const fetchPumps = async () => {
      try {
        const res = await get('/pumps/get');
        if (res.status !== 200) {
          setError('Failed to load pumps');
          return;
        }
        setPumps(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error fetching pumps');
      }
    };

  useEffect(() => {
    fetchPumps();
  }, []);

  const handleEdit = (pump: PumpData) => {
    setSelectedPump(pump);
  };

  const handleDelete = async (pump: PumpData) => {
    const res = await deleteReq('/pumps/delete', pump);
      if (res.status !== 200) {
        setError('Failed to delete pumps');
        return;
      }
    setPumps((prev) => prev.filter((p) => p.id !== pump.id));
  };

  const filteredPumps = pumps.filter((pump) =>
  pump['Pump Name'].toLowerCase().includes(searchText.toLowerCase()) ||
  pump['Type'].toLowerCase().includes(searchText.toLowerCase()) ||
  pump['Area'].toLowerCase().includes(searchText.toLowerCase())
);

  const handleSave = async (updatedPump: PumpData) => {   

    const exists = pumps.some((p) => p.id === updatedPump.id);

    if (exists) {
      const res = await put('/pumps/edit', updatedPump);
      if (res.status !== 200) {
        setError('Failed to edit pumps');
        return;
      }
      setPumps((prev) =>
        prev.map((p) => (p.id === updatedPump.id ? updatedPump : p))
      );
    } else {
      const res = await post('/pumps/add', updatedPump);
      if (res.status !== 200) {
        setError('Failed to add pumps');
        return;
      }
      fetchPumps();
    }

  setSelectedPump(null);
};

  return (
    <>
      <Box sx={{ bgcolor: '#fff', minHeight: '100vh', minWidth: '100vw' }}>
        <NavBar showMenu={true} />

        <Container sx={{ pt: 8 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: 'black', mb: 4 }}>
            Pumps
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={() => setSelectedPump(newPumpTemplate)}>
                New Pump
              </Button>
            </Box>

            <TextField
              size="small"
              placeholder="Search pumps..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    'Pump Name',
                    'Type',
                    'Area/Block',
                    'Latitude',
                    'Longitude',
                    'Flow Rate',
                    'Offset',
                    'Current Pressure',
                    'Min Pressure',
                    'Max Pressure',
                    '',
                    ''
                  ].map((header) => (
                    <TableCell key={header} sx={{ color: 'black' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPumps.map((pump) => (
                  <TableRow key={pump.id} hover>
                    <TableCell>
                      <Button variant="text" onClick={() => navigate(`/pump/${pump.id}`)}>
                        {pump['Pump Name']}
                      </Button>
                    </TableCell>
                    <TableCell>{pump['Type']}</TableCell>
                    <TableCell>{pump['Area']}</TableCell>
                    <TableCell>{pump['Latitude']}</TableCell>
                    <TableCell>{pump['Longitude']}</TableCell>
                    <TableCell>{pump['Flow Rate']}</TableCell>
                    <TableCell>{pump['Offset']}</TableCell>
                    <TableCell>{pump['Current Pressure']}</TableCell>
                    <TableCell>{pump['Min Pressure']}</TableCell>
                    <TableCell>{pump['Max Pressure']}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="warning"
                        onClick={() => handleEdit(pump)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(pump)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

      {selectedPump && (
        <EditPumpModal
          pump={selectedPump}
          onClose={() => setSelectedPump(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default OverviewPage;
