import { useState } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as jobsAPI from '../../utilities/jobs-api';
import { useNavigate } from 'react-router-dom';

export default function NewJobPage({ setJobs }) {
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
      const newJob = await jobsAPI.createJob(job);
      setJobs((jobs) => [...jobs, newJob]);
      navigate('/jobs');
    } catch (e) {
      console.error(e);
      setError('Job was not created - Try Again');
    }
  }

  return (
    <>
      <Box
        sx={{
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
    </>
  );
}
