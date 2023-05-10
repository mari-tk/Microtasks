import React from 'react'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import * as jobsAPI from '../../utilities/jobs-api'
import { Box } from '@mui/system';
import { Button } from '@mui/base';
import { useNavigate } from 'react-router-dom';

export default function ViewJobPage() {
  const navigate = useNavigate()
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
  const [error, setError] = useState('');
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

  async function handleDelete(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      await jobsAPI.deleteJob(id);
      navigate('/jobs')
    } catch (e) {
      console.error(e);
      setError('Job was not deleted - Try Again');
    }
  }

  return (
    <div>ViewJobPage
      <Box
        sx={{
          border: '2px',
          width: 600,
          backgroundColor: 'primary.light',
        }}
      >
      <div>Job {job.name} by {job.userId.name}</div>
      <div>Description {job.description}</div>
      <div>Created {job.createdAt}</div>
      <Button href={`/jobs/${job._id}/edit`}>Edit job</Button>
      <Button onClick={handleDelete}>Delete job</Button>
      <p className="error-message">&nbsp;{error}</p>
    </Box>
    </div>
  )
}
