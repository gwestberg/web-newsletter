import React from 'react';
// import './App.css';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component{
  constructor(props) {
    super(props)
    };
    
  render(){
  return (
    <div className="nav">
      <Link className= "links" to='/'>
      <h2> Menu </h2>
      </Link>
      <ul className="navlinks">
        <Link className= "links" to='/login'>
          <li>Login</li>
        </Link>
        {/*  Uppdatera Register till Update om användaren är inloggad */}
        <Link className= "links" to='/register'> 
          <li>Register</li>
        </Link>
        <Link className= "links" to='/update'>
          <li>Update</li>
        </Link>
      </ul>
    </div>
  );
}
}
