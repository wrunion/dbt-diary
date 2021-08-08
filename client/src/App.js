import React, { useState, useEffect } from 'react'
import './App.css'
import { Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import NavBar from './components/NavBar'
import Week from './components/Week-Route/Week'
import Resources from './components/Resources-Route/ResourcesDisplay'
import Today from './components/Today-Route/Today'
import moment from 'moment'

const App = () => {

  const [dailyData, setDailyData] = useState({})

  const date = moment().format('dddd, MMMM Do, YYYY')

  useEffect(() => {
    fetch('dbt/quote', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 
        const { quote, source, focus, link } = json.data[0]      
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
            title="Winter's DBT Journal"
            subtitle={`Today is ${date}`}
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
                  date={date}
                  quote={dailyData.quote} 
                  source={dailyData.source}
                />
              </Route>
              <Route exact path='/week'>
                <Week />
              </Route>
              <Route path='/resources'>
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
