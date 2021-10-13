import React, { useState, useEffect } from 'react'
import Page from '../reusable/Page'
import JournalDisplay from './JournalDisplay'
import RatingDisplay from './RatingDisplay'
import WeekInReviewForm from './WeekInReviewform'
import { Menu, Button } from 'semantic-ui-react'
import moment from 'moment'

const { Item } = Menu

const Week = () => {

  const [cards, setCards] = useState([])
  /* If we get an error on fetch, it goes here */
  const [error, setError] = useState('')
  /* options are: 'journal' or 'data' */
  const [activeTab, setActiveTab] = useState('data')

  const [showingAll, setShowingAll] = useState(false)

  const today = moment().format('dddd')

  useEffect(() => {
    fetch('dbt/entry/week', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      setCards(json.data.reverse())
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
      <RatingDisplay 
          data={cards} error={error} 
        />
      {/* {today.toLowerCase() === 'monday' &&
        <WeekInReviewForm />
        } */}
        {/* <Menu pointing secondary widths={2}>
          <Item 
            name='Journal'
            active={activeTab === 'journal'}
            onClick={() => setActiveTab('journal')}
          />
          <Item 
            name='Data'
            active={activeTab === 'data'}
            onClick={() => setActiveTab('data')}
          />
        </Menu> */}

      {/* {(cards && activeTab === 'journal') && 
        <JournalDisplay 
          cards={cards} error={error} 
        />
      }

      {(cards && activeTab === 'data') && 
        <RatingDisplay 
          data={cards} error={error} 
        />
      } */}
      <p></p>
      {!showingAll &&  
        <Button basic content='Show All Entries'
          onClick={() => showAllEntries()}
        />
      }
    </Page>
  )
}

export default Week;