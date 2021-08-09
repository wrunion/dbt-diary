import React, { useState } from 'react'
import CustomForm from '../reusable/CustomForm'

const JournalForm = () => {

  const [success, setSuccess] = useState(false)

  const inputs = [
    { name: 'meds_boolean', label: `Took meds as prescribed`, type: 'checkbox', required: false, defaultValue: false },
    { name: 'skills_boolean', label: 'Used one or more skills', type: 'checkbox', required: false, defaultValue: false },
    { name: 'inhaler_boolean', label: 'Used inhaler on schedule', type: 'checkbox', required: false, defaultValue: false },
    { name: 'concerta_boolean', label: 'Took Concerta', type: 'checkbox', required: false, defaultValue: false },
    { name: 'skills', label: 'Skills I used', type:'textarea', required: false, defaultValue: '' },
    { name: 'homework', label: 'Homework', type: 'textarea', required: false, defaultValue: '' },
    { name: 'other', label: 'Other', type: 'textarea', required: false, defaultValue: '' },
    { name: 'gratitude', label: 'Gratitude', type: 'textarea', required: false, defaulValue: '' },
    { name: 'tags', label: 'Tags', type: 'text', required: false, defaultValue: '' },
    { name: 'date', type: 'date', required: false }
  ]

  const onSubmitCallback = (data) => {
    /* The API expects: 
    * date (string)
    * entry_type (enum: 'rating' or 'journal')
    * entry (json) */

    const entry = {
      date: data.date,
      entry_type: 'journal',
      entry: data,
      tags: data.tags
    }

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
        color='violet'
        title='Journal'
        icon='moon outline'
        subheader={`How was your day?`}
      />
    </div>
  )
}

export default JournalForm
