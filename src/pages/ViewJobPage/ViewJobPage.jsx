import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as jobsAPI from '../../utilities/jobs-api';
import { Box } from '@mui/system';
import { Button } from '@mui/base';
import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import JobApplicationForm from '../../components/JobApplicationForm/JobApplicationForm';
import JobApplicationList from '../../components/JobApplicationsList/JobApplicationsList';

export default function ViewJobPage({ user }) {
  const navigate = useNavigate();
  const [job, setJob] = useState();
  const [error, setError] = useState('');
  const [viewError, setViewError] = useState('');
  // refactor id to jobId
  const { id } = useParams();
  const [jobApplications, setJobApplications] = useState();
  const [jobApplicationsState, setJobApplicationsState] = useState('loading');

  useEffect(function () {
    async function getJob() {
      try {
        const thisJob = await jobsAPI.getJob(id);
        setJob(thisJob);
        if (thisJob.userId._id === user._id) {
          setJobApplicationsState('loading');
          try {
            const allJobApplications = await jobsAPI.getJobApplications(id);
            setJobApplications(allJobApplications);
          } catch (e) {
            setError(e.message);
          }
          setJobApplicationsState('done');
        } else {
          setJobApplicationsState('notAuthor');
        }
      } catch (e) {
        setViewError(e.message);
      }
    }
    getJob();
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

  return (
    <div>
      <Box
        sx={{
          border: '2px',
          width: 600,
          backgroundColor: 'primary.light',
        }}
      >
        <div>
          Job {job.name} by {job.userId.name}
        </div>
        <div>Description {job.description}</div>
        <div>Created {job.createdAt}</div>
        <div>Status {job.state}</div>
        <Button href={`/jobs/${job._id}/edit`}>Edit job</Button>
        <Button onClick={handleDelete}>Delete job</Button>
      </Box>
      <JobApplicationList jobApplicationsState={jobApplicationsState} />
      {jobApplicationsState === 'notAuthor' ? (
        <JobApplicationForm user={user} job={job} />
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
