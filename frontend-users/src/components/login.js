import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      users: [],
      error: null
    }

  }
  componentDidMount() {
    this.fetchUsers();
  }
  onChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { userName, userPass } = this.state;
    alert("You are submitting " + userName +userPass);


    axios.post(`http://localhost:3000/users/login`, { 
      userName: userName,
      userPass: userPass,
     })
      .then((result) => {
        //access the results here....
      });
  }

  fetchUsers() {
    // Where we're fetching data from
    fetch(`http://localhost:3000/users/`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {

    const { userName, userPass } = this.state;
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>

        <form className="registrationForm" onSubmit={this.onSubmit}>
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

        <br></br>
        <h1>Random User</h1>

        {error ? <p>{error.message}</p> : null}

        {!isLoading ? (
          users.map(user => {
            const { id, userName, email } = user;
            return (
              <div key={id}>
                <p>Name: {userName}</p>
                <p>Email Address: {email}</p>
                <hr />
              </div>
            );
          })
          // If there is a delay in data, let's let the user know it's loading
        ) : (
            <h3>Loading...</h3>
          )}
      </React.Fragment>
    );
  }
}
