import React from 'react'
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

export default function NavBar({user, updateUser}) {

  function handleLogOut() {
    userService.logOut();
    updateUser(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/jobs"
          >
            <HomeIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to Microtasks, {user.name}
          </Typography>
          <Button href="/applications" color="inherit">Applied jobs</Button>
          <Button href="/jobs/dashboard" color="inherit">Manage jobs</Button>
          <Button href="/jobs/new" color="inherit">Post new job</Button>
          <Button onClick={handleLogOut} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

