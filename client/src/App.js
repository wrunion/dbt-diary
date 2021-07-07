import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './reusable/Header'
import NavBar from './components/NavBar'
import Day from './Day'

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

    <div className="App">
      <Header
        title="Winter's DBT Journal"
        subtitle="Summer 2021, Providence DBT"
        style={{ margin: '1em' }}
      />
      
      <NavBar />
      <p></p>

      <Route exact path='/'
        component={Home}
      />
      {/* <Route path='/day'
        component={Day}
      /> */}
      <Route exact path='/day'>
        <Day />
      </Route>
      <Route exact path='/week'>
        <Week />
      </Route>

    </div>
    </Router>

  );
}

export default App;
