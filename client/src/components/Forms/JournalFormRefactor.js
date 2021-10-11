import React, { useState } from 'react'
import CustomForm from '../reusable/CustomForm'
import { JOURNAL_FORM_INPUTS } from './../../data/inputs'

const JournalForm = ({ demo }) => {
  console.log(demo)
  const [success, setSuccess] = useState(false)

  const onSubmitCallback = (data) => {
    const url = demo ? '/dbt/demo/entry/create' : '/dbt/entry/create'
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

    fetch(url, {
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

  const map = JOURNAL_FORM_INPUTS.map(e => e.name)
  console.log(map)


  return (
    <div>
      <CustomForm 
        inputs={JOURNAL_FORM_INPUTS} 
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
