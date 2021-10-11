import React, { useState } from 'react'
import CustomForm from '../reusable/CustomForm'
import { DAILY_RATING_INPUTS } from './../../data/inputs'

const DailyRatingForm = ({ demo }) => {

  const [success, setSuccess] = useState(false)

  const onSubmitCallback = (data) => {
    const url = demo ? '/dbt/demo/entry/create' : '/dbt/entry/create'
    const entry = {
      date: data.date,
      entry_type: 'rating',
      entry: data
    }
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        // this tells the child form to show success dimmer
        setSuccess(true)
      }
    }).catch(err => {
      console.error(err);
      return 'There was an error. See console for details'
    })     
  }
  
  return (
    <div>
      <CustomForm 
        inputs={DAILY_RATING_INPUTS} 
        onSubmitCallback={onSubmitCallback} 
        success={success}
        color='teal'
        title='Daily DBT'
        icon='sun'
        subheader={`Rate your day from 0 to 5`}
      />
    </div>
  )
}

export default DailyRatingForm
