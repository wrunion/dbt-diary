import React from 'react'
import Page from '../reusable/Page'
import DailyCard from './DailyCard'

const Journal = ({ cards =[], error= ''}) => {

  return(
    <div>
      {error && <div>
         {error} 
        </div>}
        {cards && cards.map((e, i) => {
          if (e.journal_data) {

          return (
            <div style={{ marginBottom: '1.5em', marginTop: '.5em' }}>
              <DailyCard 
                key={e.id}
                title={e.date} 
                skills={e.journal_data.used_skills}
                homework={e.journal_data.homework}
                other={e.journal_data.other}
                gratitude={e.journal_data.gratitude} 
                />
            </div>
            )
          }
        })}
    </div>
  )
}

export default Journal;