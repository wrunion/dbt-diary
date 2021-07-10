import React, { useState, useEffect } from 'react'
import { createNewEntry } from './../api'

const DayApiTest = () => {

  const [days, setDays] = useState([])

  // const getAllDays = () => {
  //   fetch('api/day', {
  //     method: 'GET', 
  //   }).then(res => res.json()).then(json => setDays(json.data)).catch(err => console.log(err))
  // }

  // const testPost = () => {

  //   const vals = { date: 'date date', json: { "Some": "Json", "Data": "Here"}}

  //   fetch('api/day', {
  //     method: 'POST', 
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(vals)
  //   }).then(res => res.json()).then(json => {
  //     console.log(json)
  //     // if (json.success === true) { 
  //     //   // Shows dimmer message
  //     //   console.log('success!')
  //     // }
  //   }).catch(err => console.log(err))
  // }



  // const req = { date: date, json: data, type: type }
  // export const createNewEntry = ({ input, type, successCb }) => {

  // "type" represents which category of data we want to enter: 
  // either data from the Ratings form ({ type: "ratings" })
  // or data from the Journal tab ({ type: "journal" }) 
  const testJournalEntry = () => createNewEntry({ 
    date: 'asdfasdf', data: { "a": "b" }, type: 'ratings'
  })



  // useEffect(() => {
  //   getAllDays()
  // }, [])

  return(
    <div>


      
      <button onClick={() => testJournalEntry()}>Click to test post route FOR POSTGRES!!!</button>



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
