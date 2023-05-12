import React from 'react'

export default function Application({application}) {
  console.log(application);
  return (
    <div>Application for: {application.jobId.name}
      <div>Cover letter: {application.letter}</div>
    </div>
  )
}
