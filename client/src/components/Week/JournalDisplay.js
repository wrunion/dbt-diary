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
            <div key={e.id} style={{ marginBottom: '1.5em', marginTop: '.5em' }}>
              <DailyCard 
                card={e}
                index={i}
                title={formattedDate} 
                />
            </div>
            )
          }
        })}
    </div>
  )
}

export default Journal;