import React, { useState, useEffect } from 'react'
import './Today.css'
import Page from '../reusable/Page'
import JournalForm from '../forms/JournalFormRefactor'
import DailyRatingForm from '../forms/DailyRatingForm'
import QuoteForm from '../forms/QuoteForm'
import PersonalJournalForm from '../forms/PersonalJournalForm'

import { Segment, Image, Header } from 'semantic-ui-react'
const { Subheader } = Header

const containerStyles = {
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center'
}

const formDivStyles = {
  paddingLeft: '25px',
  paddingRight: '25px',
  paddingTop: '10px',
  padding: '25px'
}

const quoteStyles = {
  paddingTop: '25px',
  paddingBottom: '25px'
}


const FormDisplay = (props) => {

  const { user, date, quote, source = '', demo=true } = props

  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showRatingForm, setShowRatingForm] = useState(true)
  const [showJournal, setShowJournal] = useState(true)
  const [showPersonal, setShowPersonal] = useState(false)

  console.log(user)
  useEffect(() => {
    if (quote) { setShowQuoteForm(false) }
  }, [])

  useEffect(() => {
    fetch('dbt/entry/today', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        if (json.data[0]) {
          let type = json.data[0].entry_type
          if (type === 'rating') {
            setShowRatingForm(false)
          } else if (type === 'journal') {
            setShowJournal(false)
          }
        }
        if (json.data[1]) {
          let type = json.data[1].entry_type
          if (type === 'rating') {
            setShowRatingForm(false)
          } else if (type === 'journal') {
            setShowJournal(false)
          }
        }
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })  
  }, [])

  const DailyContainer = () => {
    return (
      <Segment>
        <Page 
          title='About Today'
          subtitle={`${quote} - ${source}`}
          icon='sun outline'
          color='violet'
          textAlign='left'
        />
      </Segment>
    )
  }

  const FormToggleControls = () => (
    <div className='show-form-div'>
      <div 
        onClick={() => setShowQuoteForm(!showQuoteForm)}       
        className='show-form-text'>Toggle Quote Form
      </div>
      <div 
        onClick={() => setShowRatingForm(!showRatingForm)} 
        className='show-form-text'>Toggle Daily DBT
      </div>
      <div 
        onClick={() => setShowJournal(!showJournal)} 
        className='show-form-text'>Toggle Journal
      </div>
      <div 
        onClick={() => setShowPersonal(!showPersonal)} 
        className='show-form-text'>Toggle Personal
      </div>
    </div>
  )

  return(
    <div style={containerStyles} id='Today'>
      <Segment style={{display: 'flex', alignItems: 'center'}}>
        <Image src={user.picture} size='mini' style={{ width: '55px', marginRight: '15px' }}circular />
        <Header as='h2' style={{marginTop: '0'}}>
          Welcome {user.name}
          <Subheader>
            You are logged in as {user.email}
          </Subheader>
        </Header>
      </Segment>

      {/* Quote only shows if it has been entered on today's date  */}
      {quote && <div style={quoteStyles}> <DailyContainer /> </div>}

      {/* <FormToggleControls /> */}
      
      {showPersonal && <PersonalJournalForm demo={demo} />}
      {/* QuoteForm only shows if no quote has been entered on today's date  */}
      {showQuoteForm && <QuoteForm demo={demo} />}

      {/* Daily rating form only shows if it's not already been completed on today's date */}
      {showRatingForm && <DailyRatingForm demo={demo} />}

      {showJournal && <JournalForm demo={demo} />}

    </div>
  )
}

export default FormDisplay;