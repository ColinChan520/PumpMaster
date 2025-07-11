import { useParams } from 'react-router-dom';
import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import type { PumpData } from '../components/EditPumpModal';
import { get } from '../api/axios';

const PumpDetailPage: React.FC = () => {
  const { pumpId } = useParams();
  const [error, setError] = useState('');
  const [pumpData, setPumpData] = useState<PumpData>();


  useEffect(() => {
      const fetchPump = async () => {
        try {
          const res = await get(`/pumps/get/${pumpId}`);
          if (res.status !== 200) {
            setError('Failed to get pump');
            return;
          }
          setPumpData(res.data);
        } catch (err: any) {
          console.error(err);
          setError(err.message || 'Error fetching pump');
        }
      };
      fetchPump();
    }, []);

  return (
    <>
    <Box sx={{ bgcolor: '#fff', minHeight: '100vh', minWidth: '100vw' }}>
      <NavBar showMenu={true} />
      {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
    )}
      {pumpData && pumpId && !error ? (
       <Container sx={{ pt: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'black', mb: 4 }}>
          {pumpData['Pump Name']}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography color="primary" variant="body2">Pump ID</Typography>
            <Typography variant="body1" mb={2} sx={{ color: 'black', mb: 4 }}>{pumpId}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
            Attributes
        </Typography>
        <Grid container spacing={5} >
            <Grid container item xs={12}>
                <Grid item xs={8}>
                <Typography variant="body2" color="text.secondary">Type</Typography>
                </Grid>
                <Grid item xs={4}>
                <Typography variant="body2" color="text.primary">{pumpData['Type']}</Typography>
                </Grid>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Area/Block</Typography>
                </Grid>
                <Grid item xs={8}>
                <Typography variant="body2" color="text.primary">{pumpData['Area']}</Typography>
                </Grid>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Location (lat/lon)</Typography>
                </Grid>
                <Grid item xs={8}>
                <Typography variant="body2" color="text.primary">
                    {pumpData['Latitude']}° N, {pumpData['Longitude']}° W
                </Typography>
                </Grid>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Flow Rate</Typography>
                </Grid>
                <Grid item xs={8}>
                <Typography variant="body2" color="text.primary">{pumpData['Flow Rate']}</Typography>
                </Grid>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Offset</Typography>
                </Grid>
                <Grid item xs={8}>
                <Typography variant="body2" color="text.primary">{pumpData['Offset']}</Typography>
                </Grid>


            <Grid container item xs={12}>
                <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">Pressure (Current | Min | Max)</Typography>
                </Grid>
                <Grid item xs={8}>
                <Typography variant="body2" color="text.primary">
                    {`${pumpData['Current Pressure']} | ${pumpData['Min Pressure']} | ${pumpData['Max Pressure']}`}
                </Typography>
                </Grid>
            </Grid>
            </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" color="primary" gutterBottom>Map</Typography>
        <Paper elevation={1} sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">[Map]</Typography>
        </Paper>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" color="primary" gutterBottom>Pressure Over Time</Typography>
        <Typography variant="h4" sx={{ color: 'black', mb: 4 }} mb={1}>{pumpData['Current Pressure']}</Typography>
        <Typography variant="body2" color="green">Last 24 Hours +5%</Typography>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={pumpData['Chart data']}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pressure" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Container>
      ) : (
        <Container sx={{ pt: 4 }}>
          <Typography variant="h5" color="error">{error || 'Pump not found'}</Typography>
        </Container>
      )}
    </Box>
    </>
  );
};

export default PumpDetailPage;
