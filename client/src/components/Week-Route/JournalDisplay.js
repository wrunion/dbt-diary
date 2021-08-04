import React from 'react'
import DailyCard from './DailyCard'

const Journal = ({ cards =[], error= ''}) => {
  return(
    <div>
      {error && <div>
         {error} 
        </div>}
        {cards && cards.map((e, i) => {
          if (e.entry_type === 'journal') {
          return (
            <div key={e.id} style={{ marginBottom: '1.5em', marginTop: '.5em' }}>
              <DailyCard 
                card={e}
                index={i}
                id={e.id}
                date={e.date}
                />
            </div>
            )
          }
        })}
    </div>
  )
}

export default Journal;