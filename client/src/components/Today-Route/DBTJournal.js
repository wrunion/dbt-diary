import React, { useState, useEffect } from 'react'
import './Today.css'
import Page from '../reusable/Page'
import DailyRatingForm from '../forms/DailyRatingForm'
import JournalForm from '../forms/PersonalJournalForm'

import { Segment, Menu } from 'semantic-ui-react'

const { Item } = Menu

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

  const { user, date, quote, source = '', demo=true } = props

  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [showRatingForm, setShowRatingForm] = useState(true)
  const [showJournal, setShowJournal] = useState(true)
  const [showPersonal, setShowPersonal] = useState(true)

  useEffect(() => {
    if (quote) { setShowQuoteForm(false) }
  }, [])

  useEffect(() => {
    fetch('dbt/entry/today', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        if (json.data[0]) {
          let type = json.data[0].entry_type
          if (type === 'rating') {
            setShowRatingForm(false)
          } else if (type === 'journal') {
            setShowJournal(false)
          }
        }
        if (json.data[1]) {
          let type = json.data[1].entry_type
          if (type === 'rating') {
            setShowRatingForm(false)
          } else if (type === 'journal') {
            setShowJournal(false)
          }
        }
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })  
  }, [])

  const DailyContainer = () => {
    return (
      <Segment>
        <Page 
          title='About Today'
          subtitle={`${quote} - ${source}`}
          icon='sun outline'
          color='violet'
          textAlign='left'
        />
      </Segment>
    )
  }

  const [activeTab, setActiveTab] = useState('journal')

  return(
    // <Page 
    //   title='A Life Worth Living' color='violet'
    //   >
    // <div style={containerStyles} id='Today'>
<>
{/* <div class="ui tabular menu attached">
  <a class="active item">
    DBT
  </a>
  <a class="item">
    Journal
  </a>
</div> */}

      {/* <Menu pointing secondary widths={2}>
        <Item 
          name='Journal'
          active={activeTab === 'journal'}
          onClick={() => setActiveTab('journal')}
        />
        <Item 
          name='Data'
          active={activeTab === 'data'}
          onClick={() => setActiveTab('data')}
        />
      </Menu> */}


<DailyRatingForm demo={demo} />


      
      {/* <JournalForm demo={demo} /> */}

</>
    // </div>
    // </Page>
  )
}

export default FormDisplay;