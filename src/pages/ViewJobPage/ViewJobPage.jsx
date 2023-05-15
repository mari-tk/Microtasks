import React from 'react';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as jobsAPI from '../../utilities/jobs-api';
import { Box } from '@mui/system';
import { Button } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';

import {
  Alert,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import JobApplicationForm from '../../components/JobApplicationForm/JobApplicationForm';
import JobApplicationList from '../../components/JobApplicationsList/JobApplicationsList';

export default function ViewJobPage({ user }) {
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [error, setError] = useState('');
  const [viewError, setViewError] = useState('');
  // refactor id to jobId
  const { id } = useParams();
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(function () {
    async function getJob() {
      try {
        setJob(await jobsAPI.getJob(id));
      } catch (e) {
        setViewError(e.message);
      }
    }
    getJob();
  }, []);

  useEffect(function () {
    async function getJobApplications() {
      try {
        const allJobApplications = await jobsAPI.getJobApplications(id);
        setJobApplications(allJobApplications);
      } catch (e) {
        setError(e.message);
      }
    }
    getJobApplications();
  }, []);

  async function handleDelete(evt) {
    try {
      await jobsAPI.deleteJob(id);
      navigate('/jobs');
    } catch (e) {
      console.error(e);
      setError('Job was not deleted - Try Again');
    }
  }

  function handleErrorClose() {
    setError('');
  }

  if (viewError) {
    return <p className="error-message">&nbsp;{viewError}</p>;
  }

  if (!job) {
    return <CircularProgress />;
  }

  let stateText, stateColor;

  if (job.state === 'active') {
    stateColor = 'green';
    stateText = 'Active';
  } else if (job.state === 'inProgress') {
    stateColor = 'yellow';
    stateText = 'In Progress';
  } else {
    stateColor = 'grey';
    stateText = 'Inactive';
  }

  const isOwnJob = job.userId._id === user._id;

  return (
    <div>
      <Paper
        sx={{
          mb: '30px',
          width: 600,
        }}
        elevation={3}
      >
        <Toolbar
          disableGutters
          sx={{
            backgroundColor: 'rgb(241,247,254)',
          }}
        >
          <Grid container alignItems="left">
            <Grid item xs={2}>
              <Typography variant="h7">
                <CircleIcon fontSize="small" sx={{ color: stateColor }} />
                {stateText}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h5">{job.name}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton href={`/jobs/${job._id}/edit`}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <Box
          sx={{
            margin: '20px',
            textAlign: 'left',
          }}
        >
          {job.description}
        </Box>
        <Box
          sx={{
            backgroundColor: 'rgb(245,245,245)',
          }}
        >
          <Grid container alignItems="left">
            <Grid item xs>
              <Typography>
                {job.userId.name} posted&nbsp;
                {moment(job.createdAt).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <JobApplicationList
        jobApplications={jobApplications}
        isOwnJob={isOwnJob}
      />
      {!isOwnJob && !jobApplications.length ? (
        <JobApplicationForm job={job} />
      ) : (
        <></>
      )}
      <Snackbar open={!!error}>
        <Alert severity="error" onClose={handleErrorClose}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
