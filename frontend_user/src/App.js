import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Login from './components/login';
import Register from './components/register';
import Update from './components/update';


function App() {
  return (
    <Router>

    <div className="App">
      <Nav />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/update" component={Update}/>
    </div>

    </Router>
  );
}

export default App;
