import { useState, useEffect } from 'react'
import './App.css'
import AuthPage from '../AuthPage/AuthPage'
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import { getUser } from '../../utilities/users-service';
import { Container } from '@mui/material';
import JobsPage from '../JobsPage/JobsPage';
import * as jobsAPI from '../../utilities/jobs-api'
import NewJobPage from '../NewJobPage/NewJobPage';
import ViewJobPage from '../ViewJobPage/ViewJobPage';
import EditJobPage from '../EditJobPage/EditJobPage';
import MyApplicationsPage from '../MyApplicationsPage/MyApplicationsPage';

export default function App() {

  const [user, setUser] = useState(getUser());

  function updateUser(userState){
    setUser(userState)
  }

  const [jobs, setJobs] = useState([]);

  useEffect(function() {
    async function getJobs() {
      const jobs = await jobsAPI.getAllJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

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
          <Routes>
            <Route path="/jobs/:id/edit" element={<EditJobPage/>} /> 
            <Route path="/jobs/:id" element={<ViewJobPage user={user}/>} />
            <Route path="/jobs/new" element={<NewJobPage user={user} setJobs={setJobs}/>} />
            <Route path="/jobs" element={<JobsPage user={user} jobs={jobs}/>}/>
            <Route path="/applications" element={<MyApplicationsPage user={user}/>} /> 
            <Route path="/" element={<Navigate to="/jobs" />} />
          </Routes>
        </> 
        :
        <AuthPage setUser={updateUser} />
      }
    </Container>
  )
}
