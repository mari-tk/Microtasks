import { CheckCircleOutline } from '@mui/icons-material';
import {
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
  Toolbar,
  Typography,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import React from 'react';

export default function JobApplicationList({ isOwnJob, jobApplications }) {
  async function handleHire(applicationId) {
    try {
      await jobsAPI.hireApplicant(applicationId, id);
      navigate('/jobs/' + id);
    } catch (e) {
      console.error(e);
      setError('Job was not deleted - Try Again');
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
                    isOwnJob ? (
                      <IconButton
                        onClick={() => handleHire(application._id)}
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
                    primary={application.userId.name}
                    secondary={application.letter}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <div>No applications ... yet</div>
        )}
      </Grid>
    </Paper>
  );
}
