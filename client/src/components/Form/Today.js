import React, { useState, useEffect } from 'react'
import './Today.css'
import JournalForm from './JournalForm'
import DailyRatingForm from '../V2/DailyRatingForm'
import QuoteForm from '../V2/QuoteForm'
import { Button } from 'semantic-ui-react'

import { Segment, Header } from 'semantic-ui-react'

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
  const [showDailyRatingForm, setShowDailyRatingForm] = useState(false)


  const DailyContainer = () => {
    return (
      <Segment fluid style={quoteStyles}>
        <Header as='h3' color='violet' 
          content={quote} 
          subheader={source ?  source : ''}
          textAlign='center' />
      </Segment>
    )
  }

  return(
    <div style={containerStyles} id='Today'>

      {/* Quote only shows if it has been entered on today's date  */}
      {quote && <div style={quoteStyles}> <DailyContainer /> </div>}

      {/* QuoteForm only shows if no quote has been entered on today's date  */}
      {showQuoteForm && <QuoteForm />}

      {/* Daily rating form only shows if it's not already been completed on today's date */}
      {showDailyRatingForm && <DailyRatingForm />}

      {/* Journal form always shows  */}
      <Segment>
        <div style={formDivStyles}>
        <JournalForm />
        </div>
      </Segment>

      {/* Options to enter new quote or daily rating data */}
      <Button basic size='tiny'>Enter new quote</Button>
      <Button basic size='tiny'>Enter new daily ratings</Button>
    </div>
  )
}

export default FormDisplay;