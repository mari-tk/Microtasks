import React from 'react'

export default function Application({application}) {
  return (
    <div>
      {application._id === application.jobId.chosenApplicationId ?
        <div> <br />
          Active job(s):
          <div>Application for: {application.jobId.name}</div>
          <div>Cover letter: {application.letter}</div>
        </div>
        :
        <div> <br />
          My applications
        <div>Application for: {application.jobId.name}</div>
        <div>Cover letter: {application.letter}</div>
      </div>
      }

    </div>
  )
}
