import React from 'react'
import Box from '@mui/material/Box';
import { Button } from '@mui/base';

export default function Job({job}) {
  console.log(job);
  return (
    <Box 
      sx={{
        border: '2px',
        width: 600,
        backgroundColor: 'primary.light',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <div>Job {job.name} by {job.userId.name}</div>
      <div>Description {job.description}</div>
      <div>Created {job.createdAt}</div>
      <Button href={`/jobs/${job._id}`}>View job</Button>
    </Box>
  )
}
