import React, { useState } from 'react'
import CustomForm from './../reusable/CustomForm'

const DailyRatingForm = () => {

  const [success, setSuccess] = useState(false)

  const inputs = [
    { name: 'SI', label: `SI`, type: 'number', required: false },
    { name: 'self_harm_urge', label: 'Self harm urge', type:'number', required: true },
    { name: 'drug_urge', label: 'Drug urge', type:'number', required: false },
    { name: 'emotional_misery', label: 'Emotional Misery', type: 'number', required: false },
    { name: 'physical_misery', label: 'Physical Misery', type:'number', required: false },
    { name: 'joy', label: 'Joy', type:'number', required: false },
    { name: 'gratitude', label: 'Gratitude', type:'number', required: false },
    { name: 'calm', label: 'Calm', type:'number', required: false },
    { name: 'intentionality', label: 'Intentionality', type:'number', required: false },
    { name: 'racing_thoughts', label: 'Racing Thoughts', type:'number', required: false },
    { name: 'skills_score', label: 'Skills Score', type:'number', required: false },
    { name: 'notes', label: 'Notes', type:'textarea', required: false },
    { name: 'focus_phrase', label: 'Focus Phrase', type:'text', required: false },
    { name: 'skills_focus', label: 'Skills Focus', type:'text', required: false },
    { name: 'date', label: '', type: 'date', required: false }
  ]

  const onSubmitCallback = (data) => {
    /* 
    * The API expects: 
    * date (string)
    * entry_type (enum: 'rating' or 'journal')
    * entry (json)
    */

    const entry = {
      date: data.date,
      entry_type: 'rating',
      entry: data
    }

    console.log(entry)
    fetch('/dbt/entry/create', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
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
        color='teal'
        title='Daily DBT'
        icon='calendar outline'
        subheader={`Rate your day from 0 to 5`}
      />
    </div>
  )
}

export default DailyRatingForm
