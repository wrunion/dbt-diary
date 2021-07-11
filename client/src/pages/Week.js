import React, { useState, useEffect } from 'react'
import Page from '../reusable/Page'
import Journal from './../components/JournalDisplay'
import RatingDisplay from './../components/RatingDisplay'
import DailyCard from '../components/DailyCard'
import { Menu } from 'semantic-ui-react'

const { Item } = Menu

const Week = () => {

  const [cards, setCards] = useState([])
  const [error, setError] = useState('')
  // choices are "journal" or "data"
  const [activeTab, setActiveTab] = useState('journal')

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
    <Page color='teal' title='This Week in DBT' icon='sun' subtitle="See what you learned and where you can improve">
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
          <Journal cards={cards} error={error} />
        
        
        // cards.map((e, i) => {
        //   if (e.journal_data) {
        //   const formattedDate = e.date.split(' ').filter(e => 
        //     e !== '2021').join(' ');
        //   return (
        //     <DailyCard 
        //       key={e.id}
        //       title={formattedDate} 
        //       skills={e.journal_data.used_skills}
        //       homework={e.journal_data.homework}
        //       other={e.journal_data.other}
        //       gratitude={e.journal_data.gratitude} 
        //       />
        //     )
        //   }
        }

      {(cards && activeTab === 'data') && 
        <RatingDisplay entries={cards} error={error} />
      }
    </Page>
  )
}

export default Week;