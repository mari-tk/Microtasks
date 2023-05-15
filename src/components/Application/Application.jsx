import { Button } from '@mui/base';
import { TableCell, TableRow, Typography } from '@mui/material';
import React from 'react';

export default function Application({ application }) {
  return (
    <TableRow key={application._id}>
      <TableCell component="th" scope="row">
        <Button href={`/jobs/${application.jobId._id}`}>
          <Typography variant="h6">{application.jobId.name}</Typography>
        </Button>
      </TableCell>
    </TableRow>
  );
}
