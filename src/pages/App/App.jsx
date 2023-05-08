import { useState, useEffect } from 'react'
import './App.css'
import AuthPage from '../AuthPage/AuthPage'
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import { getUser } from '../../utilities/users-service';
import { Container } from '@mui/material';

export default function App() {

  const [user, setUser] = useState(getUser());

  function updateUser(userState){
    setUser(userState)
  }

  return (
    <Container
      className="App"
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 'calc(100vh-64px)',
      }}
    >
       {user ? 
        <>
          <NavBar user={user} updateUser={updateUser}/>
        </> 
        :
        <AuthPage setUser={updateUser} />
      }
    </Container>
  )
}

