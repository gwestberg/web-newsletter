import React from 'react';
// import './App.css';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="nav">
      <h3>Menu</h3>
      <ul className="navlinks">
        <Link className= "links" to='/login'>
          <li>Login</li>
        </Link>
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

export default Nav;