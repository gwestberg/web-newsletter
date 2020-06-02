import React from 'react';
// import './App.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className="nav">
      <h3>Menu</h3>
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
