import { CheckCircleOutline } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import React, { useState } from 'react';
import * as jobsAPI from '../../utilities/jobs-api';

export default function JobApplicationList({ isOwnJob, job, jobApplications }) {
  const [error, setError] = useState('');

  async function handleHire(applicationId, jobId) {
    try {
      await jobsAPI.hireApplicant(applicationId, jobId);
      location.reload();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <Paper>
      <Grid item xs={12} md={6}>
        <Toolbar
          disableGutters
          sx={{
            backgroundColor: 'rgb(241,247,254)',
          }}
        >
          <Grid container alignItems="left">
            <Grid item xs>
              <Typography variant="h5">
                {isOwnJob ? 'Job applications' : 'My application'}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
        {jobApplications ? (
          <Box>
            <List>
              {jobApplications.map((application, idx) => (
                <ListItem
                  key={idx}
                  secondaryAction={
                    isOwnJob && job.state === 'active' ? (
                      <IconButton
                        onClick={() =>
                          handleHire(application._id, application.jobId._id)
                        }
                        edge="end"
                        aria-label="check"
                      >
                        <CheckCircleOutline />
                      </IconButton>
                    ) : (
                      <></>
                    )
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      (job.chosenApplicationId === application._id
                        ? '[Hired] '
                        : '') + application.userId.name
                    }
                    secondary={application.letter}
                    sx={{
                      color:
                        job.chosenApplicationId === application._id
                          ? 'green'
                          : 'black',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <div>No applications ... yet</div>
        )}
      </Grid>
      <Snackbar open={!!error}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Paper>
  );
}
