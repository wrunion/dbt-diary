import React from 'react'
import Page from '../reusable/Page'
import JournalForm from './forms/JournalForm'

const Journal = () => {
  return(
    <Page title='Journal' subtitle='In progress'>
      <JournalForm />
    </Page>
  )
}

export default Journal;