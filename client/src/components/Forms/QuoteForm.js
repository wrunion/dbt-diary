import React, { useState } from 'react'
import CustomForm from '../reusable/CustomForm'

const Quote = () => {

  const [success, setSuccess] = useState(false)

  const inputs = [
    { name: 'focus', label: `Today I want to focus on`, type: 'text', required: false },
    { name: 'quote', label: 'Daily Quote', type:'text', required: true },
    { name: 'source', label: 'Source', type:'text', required: false },
    { name: 'link', label: 'Link', type: 'text', required: false }
  ]

  const onSubmitCallback = (data) => {
    fetch('/dbt/quote/create', {
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
      console.error(err);
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
        title='Daily Quotes'
        icon='sun outline'
        subheader={`What's your focus for today?`}
      />
    </div>
  )
}

export default Quote
