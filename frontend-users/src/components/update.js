import React from 'react';
// import './App.css';

export default class Update extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user : JSON.parse(localStorage.getItem("loggedInUser")),
    };

  }

  render() {
    return (
      <div className="Update">
        <h3>Update Page</h3>
      </div>
    );
  }
}