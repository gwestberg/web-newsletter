import React from 'react';

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      userPass: '',
      userid:'',
      loggedIn: false
    };
    
  }

  //fångar upp förändringarna i formuläret
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  //Hanterar knapptrycket
  handleSubmit = (e) => {
    //förhindrar att sidan laddas om
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
    .then((response => {
      console.log(response);
      if (response != null)
      {
        var user = {
          userid: response.id,
          username: response.userName,
          newsletter: response.wantsNewsletter,
        };

        localStorage.setItem("userLoggedIn", JSON.stringify(user));

        console.log("Inloggning lyckades");
        this.setState({ loggedIn: true });
      } else console.log("Inloggning misslyckades");
    
    }
    
    ));
    // .then(data => this.props.getUser(data.id));

  }
  
  render() {

    const { userName, userPass, loggedIn } = this.state;
    return (
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="Enter username..."
            value={userName}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="userPass"
            placeholder="Enter password..."
            value={userPass}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>    
    );
  }
}
