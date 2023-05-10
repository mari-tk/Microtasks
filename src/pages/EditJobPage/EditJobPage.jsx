import { useState, useEffect} from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import * as jobsAPI from '../../utilities/jobs-api'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function EditJobPage() {

  const [job, setJob] = useState([]);
  const { id } = useParams();
  
  useEffect(function() {
    async function getJob() {
      const thisJob = await jobsAPI.getJob(id);
      setJob(thisJob);
    }
    getJob();
  }, []);

  const navigate = useNavigate()

  const [error, setError] = useState('');

  function handleChange(evt) {
    setJob({ ...job, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      const editedJob = await jobsAPI.editJob(job);
      navigate('/jobs')
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
          name="name"
          autoComplete='off'
          autoFocus
          value={job.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          name="description"
          autoComplete='off'
          value={job.description}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Job 
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
  )
}
