import React, {Component} from 'react';
import Login from './components/login';
import Register from './components/register';
import './App.css';

  export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        id: "",
        username: "",
        newsletter: "",
      };
    }
  
    setLogin = (id, username, newsletter,isLoggedIn) => {
      this.setState({
        isLoggedIn: isLoggedIn,
        id: id,
        username: username,
        newsletter: newsletter,
      });
    };
  
    render() {
      return (
        <div className="App">
          <h1>Newsletter</h1>
          <Login isLoggedIn={this.state.isLoggedIn} sendUserStatus={this.setLogin.bind(this)}/>
          <Register isLoggedIn={this.state.isLoggedIn} sendUserStatus={this.setLogin.bind(this)}/>
        </div>
      );
    }
  }


