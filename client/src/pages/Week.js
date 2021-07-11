import React, { useState, useEffect } from 'react'
import Page from '../reusable/Page'
import DailyCard from '../components/DailyCard'

const Week = () => {

  const [cards, setCards] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
  // fetch data & set in state
    fetch('api/day/test', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      console.log(json)
      setCards(json.data)
      }).catch(err => {
      console.log(err);
      setError('There was an error fetching data. See console for details.')
    }) 
  }, [])

  return(
    <Page title='Week' subtitle="In progress">
      {error && <div>
         {error} 
        </div>}
        {cards && cards.map((e, i) => {
          if (e.journal_data) {
          return (
            <DailyCard 
              key={e.timestamp}
              title={e.date} 
              skills={e.journal_data.used_skills}
              homework={e.journal_data.homework}
              other={e.journal_data.other}
              gratitude={e.journal_data.gratitude} 
              />
            )
          }
        })}
    </Page>
  )
}

export default Week;