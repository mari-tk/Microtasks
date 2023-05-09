import React from 'react'
import { useState, useEffect } from 'react'

export default function JobsPage() {

  const [jobs, setJobs] = useState([]);


  useEffect(function() {
    async function getJobs() {
      const messages = await jobsAPI.getAllJobs();
      setJobs(messages);
    }
    getJobs();
  }, []);

  return (
    <div>JobsPage

    
    </div>
  )
}
