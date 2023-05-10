import React from 'react'
import { useState, useEffect } from 'react'
import Job from '../../components/Job/Job'

export default function JobsPage({jobs}) {
  return (
    <div>JobsPage
      {jobs.map((j, idx) => <Job job={j} key={idx}/>)}
    </div>
  )
}
