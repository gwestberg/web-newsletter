import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userPass: '',
      email: '',
      wantsNewsletter: false,
    };
  }

  onChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }
  onCheckboxChange =(e) =>{
    this.setState(initialState =>({
      wantsNewsletter: !initialState.wantsNewsletter,
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { userName, userPass, email,wantsNewsletter } = this.state;
    alert("You are submitting " + userName +userPass+email+wantsNewsletter);

    axios.post(`http://localhost:3000/users/newuser`, { 
      userName: userName,
      userPass: userPass,
      email: email,
      wantsNewsletter: wantsNewsletter
     })
      .then((result) => {
        //access the results here....
      });
  }

  render() {
    const { userName, userPass, email, wantsNewsletter } = this.state;
    return (
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
        <input
          type="text"
          name="email"
          placeholder="Enter email..."
          value={email}
          onChange={this.onChange}
        />
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


// import React, { Component } from 'react';
// // import axios from 'axios'

// export default class Register extends Component {

//   constructor(props){
//     super(props);
//     this.state ={
//       userName: '',

//     }

//   }

//   ChangeHandler = (event) => {
//     let nam = event.target.username;
//     let val = event.target.value;
//     this.setState({[nam]: val});
//   }

//   SubmitHandler = (event) => {
//     event.preventDefault();
//     const{userName} = this.state;
//     // this.setState({
//     //   userName: userName
//     // });
//     alert("You are submitting " + userName);

//   }

//   render(){
//     const { userName } = this.state;
//     return (
//       <div className="Register">
//       <h3>Register Page</h3>
//       <form className="registrationForm" onSubmit={this.SubmitHandler}>
//         <label>
//           <input 
//           type="text"
//           name="userName"
//           id="userName"
//           placeholder="Enter username..." 
//           value={userName}
//           onChange={this.ChangeHandler}
//           />

//         </label>
//         {/* <label>
//           <input 
//           type="text" 
//           name="email"
//           id="email"
//           placeholder="Enter email..." 
//           value={this.state.email}
//           onChange={this.ChangeHandler}
//           >
//           </input>
//         </label>

//         <label>
//           <input 
//           type="password" 
//           name="userPass"
//           id="userPass"
//           placeholder="Enter password..." 
//           value={this.state.userPass}
//           />
//         </label>

//         <label>
//           Newsletter?
//           <input 
//           type="checkbox" 
//           name="newsletter"
//           id="newsletter"
//           value={this.state.wantsNewsletter}
//           onChange={this.ChangeHandler}
//           />
//         </label> */}

//         <input type="submit" value="Submit"/>
//       </form>
//     </div>
//   );
// }
// }
