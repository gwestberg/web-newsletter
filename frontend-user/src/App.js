import React, {useState} from 'react';
import Tweet from './Tweet';

function App() {
const [users, setUsers] = useState([
  {name:'Thomas', message: 'Hello There'}, 
  {name:'Bella', message: 'Hi hun'}, 
  {name:'Penny', message: 'Meow'}, 
  {name:'Tifa', message: 'Give treats!!'}, 


]);

  return(
    <div className="app">

      <div className="header">
        <div className="headerText">Newsletter</div>
        <ul className="menu">
        <li className="menuItem"><button className="menubtn">Register</button></li>
        <li className="menuItem"><button className="menubtn">Login</button></li>
        <li className="menuItem"><button className="menubtn">Update</button></li>
        </ul>
      </div>

      {users.map(user =>(

          <Tweet name={user.name} message={user.message} />

      ))}


    </div>
  )
}

export default App;


