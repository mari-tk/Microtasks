import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import * as jobsAPI from '../../utilities/jobs-api';
import { useNavigate } from 'react-router-dom';

export default function MyDashboardPage({ user }) {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  useEffect(function () {
    async function getJobs() {
      const jobs = await jobsAPI.getDashboard();
      setJobs(jobs);
    }
    getJobs();
  }, []);

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
    <Paper
      sx={{
        margin: '15px',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          backgroundColor: 'rgb(241,247,254)',
        }}
      >
        <Grid container>
          <Grid item xs>
            <Typography variant="h5">My jobs dashboard</Typography>
          </Grid>
        </Grid>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.name}>
                <TableCell component="th" scope="row">
                  <Button href={`/jobs/${job._id}`}>
                    <Typography variant="h6">{job.name}</Typography>
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => handleEndJob(job._id)}
                  >
                    End Job
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
