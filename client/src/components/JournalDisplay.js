import React from 'react'
import DailyCard from './DailyCard'

const Journal = ({ cards =[], error= ''}) => {

  return(
    <div>
      {error && <div>
         {error} 
        </div>}
        {cards && cards.map((e, i) => {
          if (e.journal_data) {
          const formattedDate = e.date.split(' ').filter(e => e !==
              '2021').join(' ');
          return (
            <div style={{ marginBottom: '1.5em', marginTop: '.5em' }}>
              <DailyCard 
                card={e}
                index={i}
                key={e.id}
                title={formattedDate} 
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