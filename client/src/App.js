import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import Week from './components/Week-Route/Week'
import { TempDemoWeek } from './components/Week-Route/DemoWeek'
import DemoWeek from './components/Week-Route/DemoWeek'
import Resources from './components/Resources-Route/Resources'
import moment from 'moment'
import TabNavBar from './components/TabNavBar'
import TopMenu from './components/TopMenu'
import RatingForm from './components/forms/DailyRatingForm'
import JournalForm from './components/forms/PersonalJournalForm'
import DemoJournalForm from './components/forms/DemoJournalForm'
import DemoRatingForm from './components/forms/DemoRatingForm'
import { Tab } from 'semantic-ui-react'

const App = () => {

  const [dailyData, setDailyData] = useState({})
  const [user, setUser] = useState({})
  const [demo, setDemo] = useState(true)

  const tablePaneStyle = {
    padding: '2em'
  }

  const paneStyle = {
    padding: '2em 1.5em'
  }

  const panes = [
    {
      menuItem: 'Daily DBT',
      pane: { key: 'dbt', content: demo ? <DemoRatingForm demo={demo} /> : <RatingForm demo={demo} />, style: paneStyle }
    },
    {
      menuItem: 'Journal',
      pane: { key: 'journal', content: demo ? <DemoJournalForm /> : <JournalForm demo={demo} />, style: paneStyle }
    },
    {
      menuItem: 'Week In Review',
      pane: { key: 'week', content: demo ? <DemoWeek /> : <Week /> }
    }
  ]
  
  const TabMenu = () => (
    <Tab panes={panes} 
      renderActiveOnly={false} 
      defaultActiveIndex={1} 
    />
  )

  const date = moment().format('dddd, MMMM Do, YYYY')

  // See if we have a logged in user
  // If so, show their data instead of the demo app
  useEffect(() => {
    fetch('/api/current_user', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.email) {
        const { email, name } = json
        setDemo(false)
        setUser({ email, name })
      }
    }
  ).catch(err => console.error(err))
  }, [])

  useEffect(() => {
    fetch('dbt/quote', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success === true && json.data) { 
        const { quote, source, focus, link } = json.data      
        setDailyData({ quote, source, focus, link })
      }
    }).catch(err => {
      console.error(err);
      return 'There was an error. See console for details'
    })  
  }, [])

  return (
    <Router>
      <div id="content-all">
        <TopMenu user={user ? true : false} />

        <header className="site-header">
          <SiteHeader
            user={user.email ? user : null}
            subtitle={date}
          />
        </header>
  
        <main id='main-container'>
          {/* <TabNavBar user={user ? true : false}> */}

            <TabMenu />
            {/* <div id="content">
              <Route exact path='/'>
                <RatingForm demo={demo} />
              </Route>
              <Route exact path='/journal'>
                <JournalForm demo={demo} />
              </Route>

              <Route exact path='/week'>
                {demo ? <DemoWeek /> : <Week />}
              </Route>
              <Route path='/resources'>
                <Resources />
              </Route>
            </div> */}
          {/* </TabNavBar> */}
        </main>
      </div>
    </Router>
  );
}

export default App;
