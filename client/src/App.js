import React, { useState, useEffect } from 'react'
import './App.css'
import { Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Week from './components/Week/Week'
import Resources from './components/Resources'
import moment from 'moment'
import DailyForm from './components/Day/DailyForm'
import Test from './components/ApiTest' // TEMP
import { METRICS, INITIAL_STATE } from './data/metrics.js'

const App = () => {
  // Set as a state variable bc users can change it
  // and also stored data can have a different schema
  // to override ours
  const [fields, setFields] = useState([])
  const [initialState, setInitialState] = useState([])

  // Will be used once metrics are stored in db
  // or in local storage (if PWA)
  useEffect(() => {
    METRICS && setFields(METRICS)
  })

  // Will be used once metrics are stored in db
  // or in local storage (if PWA)
  useEffect(() => {
    INITIAL_STATE && setInitialState(INITIAL_STATE)
  })
  
  const formattedDate = moment().format('dddd, MMMM Do, YYYY');

  return (
    METRICS && 
    <Router>
    <div className="parent-container" id="content-all">
      <div className="site-header">
        <Header
          title="Winter's DBT Journal"
          subtitle={`Today is ${formattedDate}`}
        />
      </div>
 
      <div id='main-container'>
        
      <NavBar />

        <Segment>
          <div id="content">
            <Route exact path='/'>
              {(fields && initialState) && <DailyForm metrics={fields} initialState={initialState} />}
            </Route>
            <Route exact path='/week'>
              <Week />
            </Route>
            <Route exact path='/resources'>
              <Resources />
            </Route>
            <Route exact path='/test'>
              <Test />
            </Route>
          </div>
        </Segment>
      </div>
    <p></p><br />
    </div>
    </Router>
  );
}

export default App;
