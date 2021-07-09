import React from 'react'
import './App.css'
import { Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Day from './components/Day'
import Week from './components/Week'
import Home from './components/Home'
// import { ReactComponent as MoonImage } from './assets/moon-phase.svg'

const App = () => {

  return (
    <Router>
    <div className="parent-container">

      <div className="header">
        <Header
          title="Winter's DBT Journal"
          subtitle="Summer 2021, Providence DBT"
          style={{ marginTop: '1em', textAlign: 'center' }}
        />
      </div>

      <div className="left-col">
        {/* <NavBar /> */}
      </div>
      <div className="right-col">
        {/* <RightColumn />   */}
      </div> 
      
      <div className="main">

      {/* route testing  */}
      {/* <ApiTest /> */}

      <NavBar />

        <Segment>
          <div id="content">
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/day'>
              <Day />
            </Route>
            <Route exact path='/week'>
              <Week />
            </Route>
          </div>
        </Segment>
      </div>
    </div>
    {/* <MoonImage /> */}
    </Router>
  );
}

export default App;
