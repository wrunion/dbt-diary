import React, { useState } from 'react'
import CustomForm from './components/Form'

/* example of how to use the CustomForm, for reference */

const Journal = () => {

  const [success, setSuccess] = useState(false)

  const inputs = [
    { name: 'focus', label: 'What is today about?', type: 'text', required: true },
    { name: 'tarot', label: 'What do the cards have to say?', type: 'textarea', required: false },
    { name: 'journal', label: 'Right now I am thinking/feeling...', type:'textarea', required: true },
    { name: 'gratitude', label: `What are you grateful for?`, type: 'text', required: true },
    { name: 'moon_phase', label: `Moon Phase`, type: 'text', required: true },
    { name: 'self_care', label: `Today I took care of myself by`, type: 'textarea', required: false },
    { name: 'other', label: `Anything else?`, type: 'textarea', required: false },
    { name: 'date', label: `Date`, type: 'date', required: true }
  ]

  const onSubmitCallback = (data) => {

    console.log(data)
    // submit data to server
    fetch('/dbt/entry/create', {
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
        title='about today'
      />
    </div>
  )
}

export default Journal