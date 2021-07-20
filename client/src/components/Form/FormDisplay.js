import React from 'react'
import JournalForm from './JournalForm'
import RatingsForm from './RatingsForm'
// import QuoteForm from './QuoteForm'
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

const FormDisplay = () => {

  return(
    <div style={containerStyles}>
      {/* <div style={formDivStyles}> */}
        {/* <QuoteForm /> */}
      {/* </div> */}
      <Segment>
      <div style={formDivStyles}>
      <RatingsForm />
      </div>
    </Segment>

      <Segment>
        <div style={formDivStyles}>
        <JournalForm />
        </div>
      </Segment>
    </div>
  )
}

export default FormDisplay;