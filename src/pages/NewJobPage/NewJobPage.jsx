import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as jobsAPI from '../../utilities/jobs-api';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Toolbar, Typography } from '@mui/material';

export default function NewJobPage() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    name: '',
    description: '',
  });

  const [error, setError] = useState('');

  function handleChange(evt) {
    setJob({ ...job, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      await jobsAPI.createJob(job);
      navigate('/jobs');
    } catch (e) {
      console.error(e);
      setError('Job was not created - Try Again');
    }
  }

  return (
    <Paper>
      <Toolbar
        disableGutters
        sx={{
          backgroundColor: 'rgb(241,247,254)',
        }}
      >
        <Grid container alignItems="left">
          <Grid item xs>
            <Typography variant="h5">Create new job</Typography>
          </Grid>
        </Grid>
      </Toolbar>
      <Box
        sx={{
          margin: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="jobName"
            label="Job Name"
            name="name"
            autoComplete="off"
            autoFocus
            value={job.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Job Description"
            name="description"
            autoComplete="off"
            value={job.description}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Post Job
          </Button>
          <Button
            href="/jobs"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cancel
          </Button>
          <p className="error-message">&nbsp;{error}</p>
        </Box>
      </Box>
    </Paper>
  );
}
