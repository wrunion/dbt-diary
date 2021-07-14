import React, { useState, useEffect } from 'react'
import Page from '../reusable/Page'
import { Menu, Segment, Divider } from 'semantic-ui-react'

const { Item } = Menu

const RawDataDisplay = () => {

  const [data, setData] = useState([])
  const [journalData, setJournalData] = useState([])
  const [ratingsData, setRatingsData] = useState([])

  /* If we get an error on fetch, it goes here */
  const [error, setError] = useState('')
  useEffect(() => {
    fetch('api/day/test', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      console.log(json.data)
      setData(json.data)

      }).catch(err => {
      setError('There was an error fetching data. See console for details.')
    }) 
  }, [])

  const entryStyles = {
    marginLeft: '10px',
    marginBottom: '20px',
    marginTop: '15px'
  }

  return(
    <>
    <Segment>
      <Page color='pink' icon='database' title={`Raw data from api/day`}>
        <div>
        {data && data.map(e => {
          return (
            <div className='elem' style={entryStyles}>
              <Divider />
              <div>date: {e.date}</div>
              <div>id: {e.id}</div>
              <div>journal_data: {e.journal_data ? 'true' : 'false'}</div>
              <div>rating_data: {e.rating_data ? 'true' : 'false'}</div>
              <div>timestamp: {e.timestamp}</div>
            </div>
          )
        })}
        </div>
      </Page>
    </Segment>

    <Segment>
      <Page color='pink' icon='book' title={`Journal data only`}>
      {data && data.filter(e => e.journal_data !== null).map(e => {
        console.log(e)
          return (
            <div>{e.date}</div>
          )
        })}
      </Page>
    </Segment>
    <Segment>
      <Page color='pink' icon='sort' title={`Ratings data only`}>

      {data && data.filter(e => e.rating_data !== null).map(e => {
          return (
            <div>{e.date}</div>
          )
        })}


      </Page>
    </Segment>
    </>
  )
}

export default RawDataDisplay;