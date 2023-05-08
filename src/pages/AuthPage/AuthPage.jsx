import React from 'react'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


export default function AuthPage({setUser}) {
  const [signUp, setSignupForm] = useState(false);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
        //Photo by Pew Nguyen: https://www.pexels.com/photo/wood-building-architecture-travel-15847199/
        backgroundImage: 'url(pexels-pew-nguyen-15847199.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
          }}
        >
          <Link href="#" onClick={() => setSignupForm(!signUp)}> {signUp ? "Have an account? Sign In" : "Don't have an account? SignUp"}</Link>
          <Typography component="h1" variant="h5">
            <Avatar sx={{ bgcolor: 'lightgrey', margin: "auto", mt: 2 }}>
              <LockOutlinedIcon />
            </Avatar>
          {signUp? "Sign Up" : "Log In"}
          </Typography>
          {signUp ?
          <SignUpForm setUser={setUser}/>
          :
          <LoginForm setUser={setUser}/>
          }
          </Box>
      </Grid>
    </Grid>
  )
}
