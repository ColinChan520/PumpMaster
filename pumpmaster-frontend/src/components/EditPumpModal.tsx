import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface PumpData {
  id: string;
  ['Pump Name']: string;
  ['Type']: string;
  ['Area']: string;
  ['Latitude']: string;
  ['Longitude']: string;
  ['Flow Rate']: string;
  ['Offset']: string;
  ['Current Pressure']: string;
  ['Min Pressure']: string;
  ['Max Pressure']: string;
  ['Chart data']?: { time: string; pressure: number }[];
}

interface EditPumpModalProps {
  pump: PumpData;
  onClose: () => void;
  onSave: (updatedPump: PumpData) => void;
}

const EditPumpModal: React.FC<EditPumpModalProps> = ({ pump, onClose, onSave }) => {
  const [formData, setFormData] = useState<PumpData>({ ...pump });

  const handleChange = (field: keyof PumpData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Edit Pump</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {formData['Pump Name']}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Pump ID: {formData.id}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Pump Name"
              fullWidth
              size="small"
              value={formData['Pump Name']}
              onChange={(e) => handleChange('Pump Name', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Pump Type"
              fullWidth
              size="small"
              value={formData['Type']}
              onChange={(e) => handleChange('Type', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Area"
              fullWidth
              size="small"
              value={formData['Area']}
              onChange={(e) => handleChange('Area', e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Latitude"
              fullWidth
              size="small"
              value={formData['Latitude']}
              onChange={(e) => handleChange('Latitude', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Longitude"
              fullWidth
              size="small"
              value={formData['Longitude']}
              onChange={(e) => handleChange('Longitude', e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Offset"
              fullWidth
              size="small"
              value={formData['Offset']}
              onChange={(e) => handleChange('Offset', e.target.value)}
            />
          </Grid>

          <Grid item xs={6}></Grid>

          <Grid item xs={6}>
            <TextField
              label="Min Pressure"
              fullWidth
              size="small"
              value={formData['Min Pressure']}
              onChange={(e) => handleChange('Min Pressure', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Max Pressure"
              fullWidth
              size="small"
              value={formData['Max Pressure']}
              onChange={(e) => handleChange('Max Pressure', e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPumpModal;
