import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function CodewitchDisplay(props) {

  const [cards, setCards] = useState([])
  /* If we get an error on fetch, it goes here */
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('dbt/entry/codewitch', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      console.log(json.data)
      setCards(json.data.reverse())
      }).catch(err => {
      console.log(err)
      setError('There was an error fetching data. See console for details.')
    }) 
  }, [])

  return (
    <div>
      Codewitch Entries will go here
    </div>
  )
}

CodewitchDisplay.propTypes = {

}

export default CodewitchDisplay

