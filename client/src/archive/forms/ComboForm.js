import React from 'react'
import JournalForm from './JournalForm'
import RatingsForm from './RatingsForm'
import { Segment, Divider } from 'semantic-ui-react'

const containerStyles = {
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'center'
}

const formDivStyles = {
  paddingLeft: '25px',
  paddingRight: '25px'
}

const ComboForm = () => {

  return(
    <div style={containerStyles}>
      <div style={formDivStyles}>
        <RatingsForm />
      </div>
      
      <Divider style={{ marginTop: '3em', marginBottom: '3em' }} />

      <div style={formDivStyles}>
        <JournalForm />
      </div>

    </div>
  )
}

export default ComboForm;