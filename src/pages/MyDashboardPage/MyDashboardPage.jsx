import React from 'react'
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import * as jobsAPI from '../../utilities/jobs-api'
import { useNavigate } from 'react-router-dom';

export default function MyDashboardPage({user, jobs}) {
  const navigate = useNavigate()
  
  async function handleEndJob(jobId) {
    // Prevent form from being submitted to the server
    try {
      await jobsAPI.endJob(jobId);
      navigate('/jobs/dashboard/');
    } catch (e) {
      console.error(e);
      // setError('Job was not ended - Try Again');
    }
  }

  return (
    <Container
      disableGutters
      sx={{
        maxHeight: 'calc(100vh - 64px)',
        paddingTop: '64px',
      }}
    >
      MyDashboardPage <br /> <br />
      {jobs.map((job, idx) => 
        <div key={idx}>
          Name: {job.name} <br />
          Description: {job.description} <br />
          JobUserid: {job.userId._id} <br />
          UserId: {user._id} <br />
          <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => handleEndJob(job._id)}
        >
          End Job 
        </Button>
        </div>

      )}
    </Container>
  )
}
