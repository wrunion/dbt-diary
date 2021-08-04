import React, { useState } from 'react'
import CustomForm from '../reusable/CustomForm'

const JournalForm = () => {

  const [success, setSuccess] = useState(false)

  // const inputs = [
  //   { name: 'meds_as_prescribed', label: `Took meds as prescribed`, type: 'checkbox', required: false, defaultValue: false },
  //   { name: 'self_harm', label: `Didn't self harm`, type:'checkbox', required: true, defaultValue: false },
  //   { name: 'skills_used', label: 'Used one or more skills', type:'checkbox', required: false, defaultValue: false },
  //   { name: 'used_skills', label: 'Skills I used', type: 'textarea', required: false, defaultValue: '' },
  //   { name: 'homework', label: 'Homework', type: 'textarea', required: false, defaultValue: '' },
  //   { name: 'other', label: 'Other', type: 'textarea', required: false, defaultValue: '' },
  //   { name: 'gratitude', label: 'Gratitude', type: 'textarea', required: false, defaulValue: '' }
  // ]

  const inputs = [
    { name: 'meds_boolean', label: `Took meds as prescribed`, type: 'checkbox', required: false, defaultValue: false },
    { name: 'harm_boolean', label: `Didn't self harm`, type:'checkbox', required: true, defaultValue: false },
    { name: 'skills_boolean', label: 'Used one or more skills', type: 'checkbox', required: false, defaultValue: false },
    { name: 'skills', label: 'Skills I used', type:'textarea', required: false, defaultValue: '' },
    { name: 'homework', label: 'Homework', type: 'textarea', required: false, defaultValue: '' },
    { name: 'other', label: 'Other', type: 'textarea', required: false, defaultValue: '' },
    { name: 'gratitude', label: 'Gratitude', type: 'textarea', required: false, defaulValue: '' },
  ]

  const onSubmitCallback = (data) => {
    /* The API expects: 
    * date (string)
    * entry_type (enum: 'rating' or 'journal')
    * entry (json) */

    const entry = {
      date: data.date,
      entry_type: 'journal',
      entry: data
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
