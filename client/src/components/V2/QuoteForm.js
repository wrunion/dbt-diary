import React, { useState } from 'react'
import CustomForm from './../reusable/CustomForm'

/* example of how to use the CustomForm, for reference */

const Quote = () => {

  const [success, setSuccess] = useState(false)

  const inputs = [
    { name: 'quote', label: 'Quote', type:'text', required: true },
    { name: 'source', label: 'Source', type:'text', required: false },
    { name: 'focus', label: `Today I want to focus on`, type: 'text', required: false }
  ]

  const onSubmitCallback = (data) => {

    console.log(data)
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
      console.log(err);
      return 'There was an error. See console for details'
    })     
  }

  // <Header as='h2'
  // content='Daily DBT' 
  // subheader='Rate your day from 0 to 5' icon='calendar outline' color='teal' textAlign='left'
  // style={{ margin: '.5em 0 1.5em 2em', alignSelf: 'center' }}
  // />
  
  return (
    <div>
      <CustomForm 
        inputs={inputs} 
        onSubmitCallback={onSubmitCallback} 
        success={success}
        color='teal'
        title='Daily Quotes'
        subheader={`What's your focus for today?`}
      />
    </div>
  )
}

export default Quote
