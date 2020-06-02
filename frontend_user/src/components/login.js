import React from 'react';
// import './App.css';



export default class Login extends React.Component{

  constructor(props){
    super(props)

    this.state ={ 
      isLoading: true,
      users: [],
      error: null
    }

  }
  componentDidMount() {
    this.fetchUsers();
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

  render(){
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>
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

  // <div className="loginForm">
  //   <input
  //     type="text"
  //     name="uname"
  //     id="uname"
  //     placeholder="Username..."
  //   />
  //   <input
  //     type="password"
  //     name="pword"
  //     id="pword"
  //     placeholder="Password..."
  //   />
  //   <button type="submit" id="loginBtn" className="loginBtn">
  //     Login
  //   </button>
  // </div>


