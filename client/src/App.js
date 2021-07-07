import React from 'react'
import './App.css'
import { BrowserRouter as Route } from 'react-router-dom'
import Header from './reusable/Header'
import NavBar from './components/NavBar'

const Day = () => {
  return(
    <>
      Day 
    </>
  )
}

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
      <Route path='/day'
        component={Day}
      />
      <Route path='/week'
        component={Week}
      />

    </div>
  );
}

export default App;
