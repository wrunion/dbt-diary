import React, { useState, useEffect } from 'react'
import Page from '../reusable/Page'
import JournalDisplay from './JournalDisplay'
import RatingDisplay from './RatingDisplay'
import WeekInReviewForm from './WeekInReviewform'
import { Menu } from 'semantic-ui-react'
import moment from 'moment'

const { Item } = Menu

const Week = () => {
  
  const [cards, setCards] = useState([])

  const [journalData, setJournalData] = useState([])
  const [ratingData, setRatingData] = useState([])
  /* If we get an error on fetch, it goes here */
  const [error, setError] = useState('')
  /* options are: 'journal' or 'data' */
  const [activeTab, setActiveTab] = useState('journal')

  const [today, setToday] = useState(moment().format('dddd'))

  useEffect(() => {
    fetch('dbt/entry/all', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      console.log(json.data)
      // const journalEntries = json.data.f
      setCards(json.data.reverse())
      }).catch(err => {
      setError('There was an error fetching data. See console for details.')
    }) 
  }, [])
  
  return(
    <>
    <Page color='grey' icon='sun' title='This Week in DBT' subtitle="See what you learned and where you can improve">
      {error && <div>
         {error} 
        </div>}
      {/* only show the "Week in review" form on Mondays */}
      {/* {today.toLowerCase() === 'monday' &&
        <WeekInReviewForm />} */}
        <Menu pointing secondary widths={2}>
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
        </Menu>

        {(cards && activeTab === 'journal') && 
          <JournalDisplay cards={cards} error={error} />}

        {(cards && activeTab === 'data') && 
          <RatingDisplay entries={cards} error={error} />}

    </Page>
    </>
  )
}

export default Week;