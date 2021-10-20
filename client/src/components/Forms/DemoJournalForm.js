import { DEMO_JOURNAL_FORM_INPUTS } from '../../data/inputs'
import React, { useState } from 'react'
import CustomForm from '../reusable/CustomForm'

const JournalDemo = () => {

  const [success, setSuccess] = useState(false)

  const onSubmitCallback = (data) => {
    console.log(data)
    setSuccess(true)
    // submit data to server
    // fetch('/codewitch/entry/create', {
    //   method: 'POST', 
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // }).then(res => res.json()).then(json => {
    //   if (json.success === true) { 
    //     // this tells the child form to show success dimmer
    //     setSuccess(true)
    //   }
    // }).catch(err => {
    //   console.error(err);
    //   return 'There was an error. See console for details'
    // })     
  }
  
  return (
    <div>
      <CustomForm 
        inputs={DEMO_JOURNAL_FORM_INPUTS} 
        onSubmitCallback={onSubmitCallback} 
        success={success}
        color='violet'
        title='about today'
        icon='coffee'
      />
    </div>
  )
}

export default JournalDemo