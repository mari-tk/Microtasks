import React from 'react';
import { useState, useEffect } from 'react';
import * as jobsAPI from '../../utilities/jobs-api';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

export default function JobApplicationForm({ user, job }) {
  const [application, setApplication] = useState({ letter: '' });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setApplication({ ...application, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(evt);
    application.jobId = job._id;
    application.userId = user._id;
    console.log(application);
    jobsAPI.applyForJob(application);
    setApplication({ letter: '' });
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
            value={application.letter}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Apply for this job
          </Button>
        </Box>
        <p className="error-message">&nbsp;{error}</p>
      </Grid>
    </Paper>
  );
}
