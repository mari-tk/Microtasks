import React from 'react'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import * as jobsAPI from '../../utilities/jobs-api'
import { Box } from '@mui/system';
import { Button } from '@mui/base';

export default function ViewJobPage() {
  const [job, setJob] = useState({
    "_id": "",
    "name": "",
    "description": "",
    "userId": {
        "_id": "",
        "name": "",
        "email": "",
        "createdAt": "",
        "updatedAt": "",
        "__v": 0
    },
    "createdAt": "",
    "updatedAt": ""
});
  const { id } = useParams();
  
  useEffect(function() {
    async function getJob() {
      console.log('HERRERRERERER');
      const thisJob = await jobsAPI.getJob(id);
      console.log('HERRERRERERER');
      console.log(thisJob);
      setJob(thisJob);
    }
    getJob();
  }, []);

  return (
    <div>ViewJobPage
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
      <Button href={`/jobs/${job._id}/edit`}>Edit job</Button>
    </Box>
    </div>
  )
}
