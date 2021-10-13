import React, { useState, useEffect } from 'react'
import './App.css'
import { Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import Week from './components/Week-Route/Week'
import DemoWeek from './components/Week-Route/DemoWeek'
import Resources from './components/Resources-Route/Resources'
import Today from './components/Today-Route/Today'
import moment from 'moment'
import NavBar from './components/NavBar'
import TabMenu from './components/TabMenu'
import DailyRatingForm from './components/forms/DailyRatingForm'
import PersonalJournalForm from './components/forms/PersonalJournalForm'


import DBTJournal from './components/Today-Route/DBTJournal'

const App = () => {

  const [dailyData, setDailyData] = useState({})
  const [user, setUser] = useState({})
  const [demo, setDemo] = useState(true)

  // const dailyDemoData = {
  //   quote: 'You are the sky. Everything else – it’s just the weather.',
  //   source: 'Pema Chödrön'
  // }

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
        const { email, picture, name } = json
        setDemo(false)
        setUser({ email, picture, name })
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
        <TabMenu user={user ? true : false} />

        <header className="site-header">
          <SiteHeader
            user={user.email ? user : null}
            subtitle={date}
          />
        </header>
  
        <main>
          <NavBar user={user ? true : false}>

            <div id="content">
              <Route exact path='/'>
                <DailyRatingForm demo={demo} />
              </Route>
              <Route exact path='/journal'>
                <PersonalJournalForm demo={demo} />
              </Route>

              <Route exact path='/week'>
                {demo ? <DemoWeek /> : <Week />}
              </Route>
              <Route path='/resources'>
                <Resources />
              </Route>
            </div>
          </NavBar>
        </main>
      </div>
    </Router>
  );
}

export default App;
