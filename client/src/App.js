import React, { useState, useEffect } from 'react'
import './App.css'
import { Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import NavBar from './components/NavBar'
import Week from './components/Week-Route/Week'
import DemoWeek from './components/Week-Route/DemoWeek'
import Resources from './components/Resources-Route/Resources'
// import DemoResources from './components/Resources-Route/DemoResourcesDisplay'
import Today from './components/Today-Route/Today'
import moment from 'moment'

const App = () => {

  const [dailyData, setDailyData] = useState({})
  const [user, setUser] = useState({})
  const [demo, setDemo] = useState(true)

  const dailyDemoData = {
    quote: 'You are the sky. Everything else – it’s just the weather.',
    source: 'Pema Chödrön'
  }

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
      if (json.success === true) { 
        const { quote, source, focus, link } = json.data      
        setDailyData({ quote, source, focus, link })
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })  
  }, [])
  
  return (
    <Router>
      <div id="content-all">
        <header className="site-header">
          <SiteHeader
            user={user}
            subtitle={date}
          />
        </header>
  
        <main id='main-container'>
          <nav>
            <NavBar />
          </nav>
          <Segment>
            <div id="content">
              <Route exact path='/'>
                <Today 
                  user={user}
                  date={date}
                  quote={demo ? dailyDemoData.quote : dailyData.quote} 
                  source={demo ? dailyDemoData.source : dailyData.source}
                  demo={demo}
                />
              </Route>
              <Route exact path='/week'>
                {demo ? <DemoWeek /> : <Week />}
              </Route>
              <Route path='/resources'>
                {/* {demo ? <DemoResources /> : <Resources />} */}
                <Resources />
              </Route>
            </div>
          </Segment>
        </main>
      </div>
    </Router>
  );
}

export default App;
