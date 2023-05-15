import React from 'react';
import { useState, useEffect } from 'react';
import * as jobsAPI from '../../utilities/jobs-api';
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

export default function JobApplicationForm({ job }) {
  const [letter, setLetter] = useState('');
  const [error, setError] = useState('');

  function handleChange(evt) {
    setLetter(evt.target.value);
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    await jobsAPI.applyForJob({ jobId: job._id, letter });
    setLetter('');
    location.reload();
  }

  return (
    <Paper>
      <Grid item xs={12} md={6}>
        <Toolbar
          disableGutters
          sx={{
            backgroundColor: 'rgb(241,247,254)',
          }}
        >
          <Grid container alignItems="left">
            <Grid item xs>
              <Typography variant="h5">Apply for a job</Typography>
            </Grid>
          </Grid>
        </Toolbar>
        Please enter your cover letter:
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="letter"
            label="write something..."
            type="text"
            value={letter}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Apply for this job
          </Button>
        </Box>
        <p className="error-message">&nbsp;{error}</p>
      </Grid>
      <Snackbar open={!!error}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Paper>
  );
}
