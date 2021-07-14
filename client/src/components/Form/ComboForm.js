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
  paddingRight: '25px',
  paddingTop: '10px',
  padding: '25px'
}

const ComboForm = () => {

  return(
    <div style={containerStyles}>
        <Segment>
        <div style={formDivStyles}>
          <RatingsForm />
        </div>
      </Segment>

      
      {/* <Divider style={{ marginTop: '3em', marginBottom: '3em' }} /> */}

        <Segment>
          <div style={formDivStyles}>
            <JournalForm />
          </div>
        </Segment>

    </div>
  )
}

export default ComboForm;