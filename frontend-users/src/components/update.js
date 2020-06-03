import React from 'react';
// import './App.css';

export default class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userid: JSON.parse(localStorage.getItem("loggedInUser")).userid,
      email: '',
      wantsNewsletter: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {userid}= this.state.userid;
    console.log(userid)
    fetch("http://localhost:3000/users/"+userid, {
      "method": "GET",
      "headers": {
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ 
          userName: data.userName,
          email: data.email,
          wantsNewsletter: data.wantsNewsletter
        })

      })

      .catch(err => {
        console.log(err);
      });
  }

  handleChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }
  onCheckboxChange = (e) => {
    this.setState(initialState => ({
      wantsNewsletter: !initialState.wantsNewsletter,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const userid = this.state.userid;
    const { userName, userPass, email, wantsNewsletter } = this.state;
    alert("You are submitting " + userName + userPass + email + wantsNewsletter);

    fetch('https://localhost:3000/users/'+userid, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: userName,
        userPass: userPass,
        email: email,
        wantsNewsletter: wantsNewsletter
      })
    });

  }

  render() {
    const { wantsNewsletter } = this.state;
    return (
      <form className="registrationForm" onSubmit={this.handleSubmit}>
        <label>
          Newsletter?
         <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            value={wantsNewsletter}
            onChange={this.onCheckboxChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}