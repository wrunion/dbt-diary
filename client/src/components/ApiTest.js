import React, { useState, useEffect } from 'react'


const DayApiTest = () => {

  const [days, setDays] = useState([])

  // const getAllDays = () => {
  //   fetch('api/day', {
  //     method: 'GET', 
  //   }).then(res => res.json()).then(json => setDays(json.data)).catch(err => console.log(err))
  // }

  const testPost = () => {

    const vals = { date: 'date date', json: { "Some": "Json", "Data": "Here"}}

    fetch('api/day', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vals)
    }).then(res => res.json()).then(json => {
      console.log(json)
      // if (json.success === true) { 
      //   // Shows dimmer message
      //   console.log('success!')
      // }
    }).catch(err => console.log(err))
  }

  // useEffect(() => {
  //   getAllDays()
  // }, [])

  return(
    <div>


      
      <button onClick={() => testPost()}>Click to test post route FOR POSTGRES!!!</button>



      {/* REFACTOR BELOW TO WORK WITH POSTGRES  */}
{/* 
      <button onClick={() => getAllDays()}>Click to test GET route</button>

      {days && 
      <div id='days-div'>
        {days.map(e => <div key={e._id}>
          Joy: {e.joy} 
        </div>)}
      </div>} */}

    </div>
  )
}

export default DayApiTest;
