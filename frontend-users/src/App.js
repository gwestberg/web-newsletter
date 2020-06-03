import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Nav from './components/nav';
import Login from './components/login';
import Register from './components/register';
import Update from './components/update';


export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state ={ 
      user : JSON.parse(localStorage.getItem("loggedInUser")),
      // loggedIn: false
    }
  };


  saveUser = (user) =>{
    console.log(user);
    this.setState({
      user: user.user.userid,
      loggedIn: user.loggedIn
    })
  };

  render(){
    return (
    <div className="App">
      {/* <button>Logga In</button>
      <button>Registrera</button>
      <Login getUser={this.saveUser}/>
      <br/>
      <br/>
      <Register />
      <Update /> */}

      
      <Router>
      <Nav />
      <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register}/>
      <Route path="/update" component={Update}/>
      </Switch>
    </Router>
    </div>
  );
}
}

