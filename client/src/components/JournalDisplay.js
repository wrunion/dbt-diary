import React from 'react'
import Page from '../reusable/Page'
import DailyCard from './DailyCard'

const Week = ({ cards =[], error= ''}) => {

  return(
    <Page title='Week' subtitle="In progress">
      {error && <div>
         {error} 
        </div>}
        {cards && cards.map((e, i) => {
          if (e.journal_data) {
          return (
            <DailyCard 
              key={e.id}
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