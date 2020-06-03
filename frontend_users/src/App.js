import React, {Component} from 'react';
import Login from './components/login';
import Register from './components/register';
import Update from './components/update';
import './App.css';

  export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggedIn: false,
        id: "",
        username: "",
        email: "",
        newsletter: "",
      };
    }

    setLogin = (id, username, email, newsletter,isLoggedIn) => {
      this.setState({
        isLoggedIn: isLoggedIn,
        id: id,
        email: email,
        username: username,
        newsletter: newsletter,
      });
    };
  
    render() {
      if (this.state.isLoggedIn === false) {
        return(
          <div className="App">
          <h1>Newsletter</h1>
          <Login isLoggedIn={this.state.isLoggedIn} sendUserStatus={this.setLogin.bind(this)}/>
        <Register isLoggedIn={this.state.isLoggedIn}/>  
        </div>
        )
      }else
      {
        return(
          <div className="App">
          <h1>Newsletter</h1>
          <Login isLoggedIn={this.state.isLoggedIn} sendUserStatus={this.setLogin.bind(this)}/>
          <Update sendUser={this.state} sendUserStatus={this.setLogin.bind(this)}/>
        </div>
        )
      }
    }
  }


