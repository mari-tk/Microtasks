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
  Typography,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import React from 'react';

export default function JobApplicationList({
  jobApplicationsState,
  jobApplications,
}) {
  if (jobApplicationsState === 'loading') {
    return <CircularProgress />;
  }

  if (jobApplicationsState != 'done') {
    return null;
  }

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
    <div>
      JobApplicationList
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Job applications
        </Typography>
        {jobApplications ? (
          <Box>
            <List>
              {jobApplications.map((application, idx) => (
                <ListItem
                  key={idx}
                  secondaryAction={
                    <IconButton
                      onClick={() => handleHire(application._id)}
                      edge="end"
                      aria-label="check"
                    >
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
              ))}
            </List>
          </Box>
        ) : (
          <div>No applications ... yet</div>
        )}
      </Grid>
    </div>
  );
}
