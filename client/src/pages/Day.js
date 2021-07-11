import React from 'react'
import { Segment } from 'semantic-ui-react'
import Page from '../reusable/Page'
// import Form from '../components/forms/RatingsForm'
import Form from '../components/forms/RatingsFormTest'

const Day = () => {

  return(
    <Page title='Daily DBT' subtitle='Rate your day from 0 to 5'>
      <Segment>
        <Form />
      </Segment>

    </Page>
  )
}

export default Day;