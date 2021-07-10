import React from 'react'
import Page from '../reusable/Page'
import JournalForm from './forms/JournalForm'

const Journal = () => {
  return(
    <Page title='Journal' subtitle='How was your day?'>
      <JournalForm />
    </Page>
  )
}

export default Journal;