import React from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Image from 'mui-image';
import logo from '../../assets/microtasks.png';

export default function AuthPage({ setUser }) {
  const [signUp, setSignupForm] = useState(false);

  return (
    <Grid container>
      <Grid item component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 6,
            mx: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '600px',
          }}
        >
          <Typography component="h1" variant="h5">
            <Image src={logo} />
          </Typography>
          {signUp ? (
            <SignUpForm setUser={setUser} />
          ) : (
            <LoginForm setUser={setUser} />
          )}
          <Link href="#" onClick={() => setSignupForm(!signUp)}>
            {' '}
            {signUp
              ? 'Have an account? Log In'
              : "Don't have an account? SignUp"}
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
