import React from 'react'
import Page from '../reusable/Page'
import JournalForm from '../components/forms/JournalForm'

const Journal = () => {
  return(
    <Page title='Journal' subtitle='How was your day?' icon='moon' color='teal'>
      <JournalForm />
    </Page>
  )
}

export default Journal;