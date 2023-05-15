import moment from 'moment/moment';
import React from 'react';
import Box from '@mui/material/Box';
import {
  AppBar,
  Grid,
  Paper,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

export default function Job({ user, job }) {
  console.log(user, 'This is user');
  console.log(job, 'Job this is');
  return (
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
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Button href={`/jobs/${job._id}`}>
              <Typography variant="h5">{job.name}</Typography>
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" href={`/jobs/${job._id}`}>
              {user._id === job.userId._id ? 'View' : 'Apply'}
            </Button>
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
  );
}
