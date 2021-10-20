import React, { useState, useEffect } from 'react'
import Page from '../reusable/Page'
import JournalDisplay from './JournalDisplay'
import DemoRatingDisplay from './DemoRatingDisplay'
import WeekInReviewForm from './WeekInReviewform'
import { Menu, Button } from 'semantic-ui-react'
import moment from 'moment'

const { Item } = Menu

const tempDivStyle = {
  textAlign: 'center',
  margin: '1em',
  color: 'grey',
  fontSize: '1.5em'

}

// TEMP FOR DEMO
export const TempDemoWeek = () => (
  <Page 
  color='grey' icon='sun' 
  title='This Week in DBT' 
  subtitle="See what you learned and where you can improve"
  >
    <div style={tempDivStyle}>Demo coming soon!</div>

  </Page>
)



// TODO: get this working
const Week = () => {

  const [ratingEntries, setRatingEntries] = useState([])

  const [cards, setCards] = useState([])
  /* If we get an error on fetch, it goes here */
  const [error, setError] = useState('')
  /* options are: 'journal' or 'data' */
  // const [activeTab, setActiveTab] = useState('data')

  const [showingAll, setShowingAll] = useState(false)

  const today = moment().format('dddd')

  useEffect(() => {
    fetch('dbt/demo/entry/week', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      setCards(json.data?.reverse())
      // const ratingEntries = json.data?.filter(e => e.entry_type === 'rating').filter
      // setRatingEntries(ratingEntries)
      }).catch(err => {
      console.log(err)
      setError('There was an error fetching data. See console for details.')
    }) 
  }, [])

  const showAllEntries = () => {
    fetch('dbt/entry/all', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      setCards(json.data.reverse())
      // const ratingEntries = json.data.filter(e => e.entry_type === 'rating').filter
      // setRatingEntries(ratingEntries)
      setShowingAll(true)
      }).catch(err => {
      console.log(err)
      setError('There was an error fetching data. See console for details.')
    }) 
  }
  
  return (
    <Page 
      color='grey' icon='sun' 
      title='This Week in DBT' 
      subtitle="See what you learned and where you can improve"
      >
      {error && <div>{error}</div>} 
      <DemoRatingDisplay 
          data={cards} error={error} 
        />
      {/* {today.toLowerCase() === 'monday' &&
        <WeekInReviewForm />
        } */}

      {cards && 
        <JournalDisplay 
          cards={cards} error={error} 
        />
      }

      <p></p>

    </Page>
  )
}

export default Week