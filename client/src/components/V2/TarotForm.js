import React, { useState, useEffect } from 'react'
import CustomForm from './../reusable/CustomForm'

const preStyle = {
  whiteSpace: 'pre-wrap', 
  fontFamily: 'inherit',
  display: 'flex',
  lineHeight: '1.5em',
  textAlign: 'justify',
  padding: '.5em'
}

const TarotForm = () => {

  const [success, setSuccess] = useState(false)
  const [result, setResult] = useState('')

  const inputs = [
    { name: 'spread', label: `Which spread did you use?`, type: 'text', required: true },
    { name: 'cards', label: 'Cards I drew', type:'text', required: true },
    { name: 'meaning', label: 'What do the cards have to say?', type:'textarea', required: false },
    { name: 'daily_focus', label: 'How does this relate to your daily goal?', type: 'textarea', required: false },
    { name: 'weekly_theme', label: 'How does this relate to the rest of your week?', type: 'text', required: false }
  ]

  const onSubmitCallback = (data) => {
    fetch('/tarot/draw/create', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        console.log(json)
        if (json.entry.weekly_theme) {
          setResult(json.entry.weekly_theme)
          console.log(result)
        }
        setSuccess(true)
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })     
  }

  useEffect(() => {
    setResult("King of Swords, Reversed: living based on your internal values and quiet wisdom, not external trappings of wealth and success. \n \nAce of Pentacles Reversed: Listen to your hesitation. Listen to your intuition. If it's telling you to slow down or stop, then do so. Sit with yourself, and your heart, and your past, and simply listen. \n \nThree of Swords Reversed: It's time to heal and move on. Some of the heartbreak is in the past now, and it's okay to heal and move on. It's time.")
    console.log(result)
  }, [])

  // const DisplayResult = ({ title, color, result }) => (
  //   <Segment style={{ padding: '35px' }}>
  //     <Header as='h2' color={color} content={title} />
  //     <pre style={preStyle}>{result}</pre> 
  //   </Segment>
  // )

  return (
    <div>
      {!result && <CustomForm 
        inputs={inputs} 
        onSubmitCallback={onSubmitCallback} 
        success={success}
        color='violet'
        title='Daily Draw'
        subheader={`What do your cards say today?`}
        icon='sun outline'
      />}
    </div>
  )
}

export default TarotForm
