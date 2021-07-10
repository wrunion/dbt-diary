import React, { useState, useEffect } from 'react'
import Page from '../reusable/Page'
import DailyCard from '../components/DailyCard'

const Week = () => {

  const [cards, setCards] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
  // fetch data & set in state
    fetch('api/day', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      console.log(json)
      setCards(json)
      }).catch(err => {
      console.log(err);
      setError('There was an error fetching data. See console for details.')
    }) 
  }, [])
  
  const sampleObject = {
    "id": 2,
    "date": "Saturday July 10th 2021",
    "timestamp": "1625911101168",
    "rating_data": null,
    "journal_data": {
        "meds_as_prescribed": true,
        "self_harm": true,
        "used_skills": "Briefly, I remembered to stay in the moment by realizing that I was thinking too far ahead into the future, and reminding myself to come back to the present moment. I took a breath, and I feel more grounded and centered in my body now. ",
        "homework": "Yesterday I did observe and describe some wandering thoughts, and brought myself back to the situation at hand. I was with my partner and relaxing, and I kept thinking of things I had to do. But I reminded myself to stay in the moment, and that helped!",
        "other": "",
        "gratitude": "I'm grateful that I get to code, and to play piano. I'm grateful that I have time to rest and relax and pursue hobbies for awhile. "
      }
    }
    
  return(
    <Page title='Week' subtitle="In progress">
      {error && <div>
         {error} 
        </div>}
        {/* {cards && cards.map((e, i) => {
          return (

          )
        })} */}
      {/* <DailyCard /> */}

    </Page>
  )
}

export default Week;