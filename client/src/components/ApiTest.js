import React, { useState, useEffect } from 'react'


const DayApiTest = () => {

  const [days, setDays] = useState([])

  const getAllDays = () => {
    fetch('api/day', {
      method: 'GET', 
    }).then(res => res.json()).then(json => setDays(json.data)).catch(err => console.log(err))
  }

  useEffect(() => {
    getAllDays()
  }, [])

  return(
    <div>

      <button onClick={() => getAllDays()}>Click to test GET route</button>

      {days && 
      <div id='days-div'>
        {days.map(e => <div key={e._id}>
          Joy: {e.joy} 
        </div>)}
      </div>}

    </div>
  )
}

export default DayApiTest;
