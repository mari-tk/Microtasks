import React from 'react'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import * as jobsAPI from '../../utilities/jobs-api'
import { Box } from '@mui/system';
import { Button } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import JobApplicationForm from '../../components/JobApplicationForm/JobApplicationForm';

export default function ViewJobPage({user}) {
  const navigate = useNavigate()
  const [job, setJob] = useState();
  const [error, setError] = useState('');
  const [viewError, setViewError] = useState('');
  const { id } = useParams();
  // const [jobApplications, setJobApplications] = useState();
  
  useEffect(function() {
    async function getJob() {
      try{
      const thisJob = await jobsAPI.getJob(id);
      setJob(thisJob);
      } catch (e) { 
        setViewError(e.message)
      }
    }
    getJob();
  }, []);

//   useEffect(function() {
//     async function getJobApplications() {
//       try{
//       const allJobApplications = await jobsAPI.getJobApplications(id);
//       setJobApplications(allJobApplications);
//       } catch (e) { 
//         setViewError(e.message)
//       }
//     }
//     getJobApplications();
// }, []);

  async function handleDelete(evt) {
    // Prevent form from being submitted to the server
    try {
      await jobsAPI.deleteJob(id);
      navigate('/jobs')
    } catch (e) {
      console.error(e);
      setError('Job was not deleted - Try Again');
    }
  }

  if (viewError){
    return <p className="error-message">&nbsp;{viewError}</p>
  }

  if (!job) {
    return <CircularProgress />
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
        <div>
          <JobApplicationForm user={user} job={job}/>
        </div>
    </div>
  )
}
