import React from 'react'
import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

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
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to Microtasks, {user.name}
          </Typography>
          <Button onClick={handleLogOut} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

