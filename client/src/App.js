import React from 'react'
import './App.css'
import { Segment } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Day from './pages/Day'
import Week from './pages/Week'
import Journal from './pages/Journal'
import Resources from './pages/Resources'

const App = () => {

  return (
    <Router>
    <div className="parent-container">

      <div className="site-header">
        <Header
          title="Winter's DBT Journal"
          subtitle="Summer 2021, Providence DBT"
          style={{ marginTop: '1em', textAlign: 'center' }}
        />
      </div>
 
      <div style={{width: '90%', margin: '0 auto', maxWidth: '900px' }}>
      <NavBar />

        <Segment>
          <div id="content">
            <Route exact path='/'>
              <Journal />
            </Route>
            <Route exact path='/day'>
              <Day />
            </Route>
            <Route exact path='/week'>
              <Week />
            </Route>
            <Route exact path='/resources'>
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
