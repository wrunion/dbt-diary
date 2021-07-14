import React, { useState, useEffect } from 'react'
import Page from '../reusable/Page'
import JournalDisplay from './JournalDisplay'
import RatingDisplay from './RatingDisplay'
import { Menu } from 'semantic-ui-react'

const { Item } = Menu

const Week = () => {

  const [cards, setCards] = useState([])
  /* If we get an error on fetch, it goes here */
  const [error, setError] = useState('')
  /* options are: 'journal' or 'data' */
  const [activeTab, setActiveTab] = useState('journal')

  useEffect(() => {
    fetch('api/day/test', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      setCards(json.data)
      }).catch(err => {
      setError('There was an error fetching data. See console for details.')
    }) 
  }, [])

  console.log(cards)

  return(
    <Page color='grey' icon='sun' title='This Week in DBT' subtitle="See what you learned and where you can improve">
      {error && <div>
         {error} 
        </div>}
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
  )
}

export default Week;