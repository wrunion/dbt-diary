import React, { useState, useEffect } from 'react'
import './App.css'
import { Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Week from './components/Week/Week'
import Resources from './components/Resources/ResourcesDisplay'
import FormDisplay from './components/Form/FormDisplay'
import moment from 'moment'

const App = () => {

  const [dailyData, setDailyData] = useState({})

  const longDate = moment().format('dddd, MMMM Do, YYYY');

  useEffect(() => {
    fetch('dbt/quote', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      if (json.success === true) { 

        const { quote, source, focus, link } = json.data[0]
        
        setDailyData({ 
          quote, 
          source, 
          focus, 
          link 
        })
      }
    }).catch(err => {
      console.log(err);
      return 'There was an error. See console for details'
    })  
  }, [])
  
  return (
    <Router>
    <div className="parent-container" id="content-all">
      <div className="site-header">
        <Header
          title="Winter's DBT Journal"
          subtitle={`Today is ${longDate}`}
        />
      </div>
 
      <div id='main-container'>
      <NavBar />
        <Segment>
          <div id="content">
            <Route exact path='/'>
              <FormDisplay 
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
      </div>
    <p></p><br />
    </div>
    </Router>
  );
}

export default App;
