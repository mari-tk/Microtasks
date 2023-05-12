import React from 'react'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import * as jobsAPI from '../../utilities/jobs-api'
import { Box } from '@mui/system';
import { Button } from '@mui/base';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { Avatar, CircularProgress, IconButton, ListItem, ListItemAvatar } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import ListItemText from '@mui/material/ListItemText';
import JobApplicationForm from '../../components/JobApplicationForm/JobApplicationForm';
import { CheckCircleOutline } from '@mui/icons-material';

export default function ViewJobPage({user}) {
  const navigate = useNavigate()
  const [job, setJob] = useState();
  const [error, setError] = useState('');
  const [viewError, setViewError] = useState('');
  // refactor id to jobId
  const { id } = useParams();
  const [jobApplications, setJobApplications] = useState();
  
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

  useEffect(function() {
    async function getJobApplications() {
      try{
      const allJobApplications = await jobsAPI.getJobApplications(id);
      setJobApplications(allJobApplications);
      } catch (e) { 
        setViewError(e.message)
      }
    }
    getJobApplications();
}, []);

  async function handleDelete(evt) {
    try {
      await jobsAPI.deleteJob(id);
      navigate('/jobs')
    } catch (e) {
      console.error(e);
      setError('Job was not deleted - Try Again');
    }
  }

  async function handleHire(applicationId) {
    try {
      await jobsAPI.hireApplicant(applicationId, id);
      navigate('/jobs/' + id)
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
    <div>
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
        <div>Status {job.state}</div>
        <Button href={`/jobs/${job._id}/edit`}>Edit job</Button>
        <Button onClick={handleDelete}>Delete job</Button>
        <p className="error-message">&nbsp;{error}</p>
        </Box>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Job applications
          </Typography>
          {jobApplications ?
            <Box>
              <List>
                {jobApplications.map((application, idx)=>                 
                  <ListItem key = {idx}
                    secondaryAction={
                      <IconButton onClick={() => handleHire(application._id)} edge="end" aria-label="check">
                        <CheckCircleOutline />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <DescriptionIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={application.userId.name}
                      secondary={application.letter}
                    />
                  </ListItem> 
                )}
              </List>
            </Box>
            :
            <div>No applications ... yet</div>
          }
        </Grid>
        <div>
          <JobApplicationForm user={user} job={job}/>
        </div>
    </div>
  )
}
