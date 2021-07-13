import React from 'react'
import Page from '../reusable/Page'
import { Segment } from 'semantic-ui-react'

const Week = () => {
  return(
    <Page 
      title='Resources' color='grey' icon='book'
      subtitle='In progress'>
      
      <Segment style={{ fontWeight: 'bold' }}>
        Links to online DBT resources coming soon! 
      </Segment>
    </Page>
  )
}

export default Week;
