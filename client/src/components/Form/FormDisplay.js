import React from 'react'
import JournalForm from './JournalForm'
import RatingsForm from './../V2/RatingsForm'
// import QuoteForm from './QuoteForm'
import QuoteForm from './../V2/QuoteForm'
import TarotForm from './../V2/TarotForm'

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

  const { quote } = props
  const source = props.source || ''

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
    <div style={containerStyles}>
      {!quote && <QuoteForm />}
      <TarotForm />
        <div style={quoteStyles}>
          {quote && <DailyContainer />}
        </div>

      <RatingsForm />

      <Segment>
        <div style={formDivStyles}>
        <JournalForm />
        </div>
      </Segment>
    </div>
  )
}

export default FormDisplay;