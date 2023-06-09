import React from 'react';
import { useState, useEffect } from 'react';
import Job from '../../components/Job/Job';
import * as jobsAPI from '../../utilities/jobs-api';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

export default function JobsPage({ user }) {
  const [jobs, setJobs] = useState([]);

  useEffect(function () {
    async function getJobs() {
      const jobs = await jobsAPI.getAllJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

  return (
    <Container
      // disableGutters
      sx={{
        maxHeight: 'calc(100vh - 64px)',
        paddingTop: '64px',
      }}
    >
      {jobs.map((j, idx) => (
        <Job user={user} job={j} key={idx} />
      ))}
    </Container>
  );
}
