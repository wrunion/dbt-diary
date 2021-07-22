import React, { useState } from 'react'
import CustomForm from './components/Form'
// import { Segment, Form, Input, Label, Header, Button, Dimmer, Icon } from 'semantic-ui-react'
// import PropTypes from 'prop-types'
// const { Field } = Form
// const { Dimmable } = Dimmer
// const { Subheader } = Header

// INSERT INTO codewitch (focus, tarot, journal, gratitude, moon_phase, self_care, other) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
// FOCUS, GRATITUDE, AND MOON PHASE ARE REQUIRED

const Journal = () => {

  const [success, setSuccess] = useState(false)

  const inputs = [
    { name: 'focus', label: 'What is today about?', type: 'text', required: true },
    { name: 'tarot', label: 'What do the cards have to say?', type: 'textarea', required: false },
    { name: 'journal', label: 'What are you thinking and feeling?', type:'textarea', required: true },
    { name: 'gratitude', label: `What are you grateful for?`, type: 'text', required: true },
    { name: 'moon_phase', label: `Moon Phase`, type: 'text', required: true },
    { name: 'self_care', label: `Today I took care of myself by`, type: 'textarea', required: false },
    { name: 'other', label: `Anything else?`, type: 'textarea', required: false }
  ]

  const onSubmitCallback = (data) => {

    console.log(data)
    // submit data to server
    fetch('/codewitch/journal/create', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        console.log(json)
        // this tells the child form to show success dimmer
        setSuccess(true)
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })     
  }
  
  return (
    <div>
      <CustomForm 
        inputs={inputs} 
        onSubmitCallback={onSubmitCallback} 
        success={success}
        color='violet'
      />
    </div>
  )
}

export default Journal