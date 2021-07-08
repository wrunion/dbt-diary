import React from 'react'
import './App.css'
import { Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './reusable/Header'
import NavBar from './components/NavBar'
import Day from './Day'
import Page from './reusable/Page'

const Week = () => {
  return(
    <>
      Week 
    </>
  )
}

const Home = () => {
  return(
    <>
      Home
    </>
  )
}

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
        <NavBar />
      </div>
      <div className="right-col"></div> 

      <div className="main">
        <Segment>
          <div id="content">
            <Route exact path='/'>
              <Page title='Home' />
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
    </Router>
  );
}

export default App;
