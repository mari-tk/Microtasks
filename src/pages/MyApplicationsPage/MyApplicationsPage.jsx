import React, { useState, useEffect } from 'react';
import Application from '../../components/Application/Application';
import * as applicationsAPI from '../../utilities/applications-api';
import { Container } from '@mui/material';

export default function MyApplicationsPage({ user }) {
  const [applications, setApplications] = useState([]);

  useEffect(function () {
    async function getMyApplications() {
      try {
        const allApplications = await applicationsAPI.getMyApplications(
          user._id
        );
        setApplications(allApplications);
      } catch (e) {
        setViewError(e.message);
      }
    }
    getMyApplications();
  }, []);

  return (
    <Container
      disableGutters
      sx={{
        maxHeight: 'calc(100vh - 64px)',
        paddingTop: '64px',
      }}
    >
      MY APPLICATIONS:
      {applications.map((a, idx) => (
        <Application application={a} key={idx} />
      ))}
    </Container>
  );
}
