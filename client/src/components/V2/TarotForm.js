import React, { useState } from 'react'
import CustomForm from './../reusable/CustomForm'

const TarotForm = () => {

  const [success, setSuccess] = useState(false)

  const inputs = [
    { name: 'spread', label: `Which spread did you use?`, type: 'text', required: true },
    { name: 'cards', label: 'Cards I drew', type:'text', required: true },
    { name: 'meaning', label: 'What do the cards have to say?', type:'textarea', required: false },
    { name: 'daily_focus', label: 'How does this relate to your daily goal?', type: 'textarea', required: false },
    { name: 'weekly_theme', label: 'How does this relate to the rest of your week?', type: 'text', required: false }
  ]

  const onSubmitCallback = (data) => {

    console.log(data)
    fetch('/dbt/draw/create', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        console.log(json)
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
        title='Daily Draw'
        subheader={`What do your cards say today?`}
        icon='sun outline'
      />
    </div>
  )
}

export default TarotForm
