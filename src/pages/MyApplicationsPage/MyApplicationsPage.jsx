import React, { useState, useEffect } from 'react';
import Application from '../../components/Application/Application';
import * as applicationsAPI from '../../utilities/applications-api';
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Toolbar,
  Typography,
} from '@mui/material';

export default function MyApplicationsPage({ user }) {
  const [applications, setApplications] = useState([]);

  useEffect(function () {
    async function getMyApplications() {
      try {
        const allApplications = await applicationsAPI.getMyApplications();
        setApplications(allApplications);
      } catch (e) {
        setViewError(e.message);
      }
    }
    getMyApplications();
  }, []);

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
            <Typography variant="h5"> My applications</Typography>
          </Grid>
        </Grid>
      </Toolbar>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {applications.map((a, idx) => (
              <Application application={a} key={idx} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
