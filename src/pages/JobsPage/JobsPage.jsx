import React from 'react'
import { useState, useEffect } from 'react'
import Job from '../../components/Job/Job'
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

export default function JobsPage({jobs}) {
  return (
    <Container
      disableGutters
      sx={{
        maxHeight: 'calc(100vh - 64px)',
        paddingTop: '64px',
      }}
    >
      {jobs.map((j, idx) => <Job job={j} key={idx}/>)}
    </Container>
  )
}
