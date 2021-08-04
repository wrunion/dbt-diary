import React, { useState, useEffect } from 'react'
import './Today.css'
import Page from '../reusable/Page'
import JournalForm from '../forms/JournalFormRefactor'
import DailyRatingForm from '../forms/DailyRatingForm'
import QuoteForm from '../forms/QuoteForm'

import { Segment } from 'semantic-ui-react'

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

  const { date, quote, source = '' } = props

  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showRatingForm, setShowRatingForm] = useState(true)
  const [showJournal, setShowJournal] = useState(true)

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
          subtitle={quote}
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
    </div>
  )

  return(
    <div style={containerStyles} id='Today'>
      <FormToggleControls />

      {/* Quote only shows if it has been entered on today's date  */}
      {quote && <div style={quoteStyles}> <DailyContainer /> </div>}

      {/* QuoteForm only shows if no quote has been entered on today's date  */}
      {showQuoteForm && <QuoteForm />}

      {/* Daily rating form only shows if it's not already been completed on today's date */}
      {showRatingForm && <DailyRatingForm />}

      {showJournal && <JournalForm />}

    </div>
  )
}

export default FormDisplay;