import React from 'react';

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userPass: '',
      userid:'',
    };
    
  }

  onChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { userName, userPass } = this.state;
    alert("You are submitting " + userName +userPass);

    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: userName,
        userPass: userPass
      })
    })

    .then(response => response.json())
    .then(data => console.log(data));
    // .then(data => this.setState({ userid: data.id }));

  }
  
  render() {

    const { userName, userPass } = this.state;
    return (
        <form className="loginForm" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Enter username..."
            value={userName}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="userPass"
            placeholder="Enter password..."
            value={userPass}
            onChange={this.onChange}
          />
          <button type="submit">Submit</button>
        </form>    
    );
  }
}
