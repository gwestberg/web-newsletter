
import React, { Component } from "react";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            username: "",
            password: "",
            wantsNewsletter: false,
            isLoggedIn: this.props.isLoggedIn,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        //Hanterar uppdateringar
        this.setState({ [e.target.name]: e.target.value });
    };
    handleNewsletterChange = (e) => {
        this.setState(initialState => ({
            wantsNewsletter: !initialState.wantsNewsletter,
        }));
    }
    handleSubmit = (e) => {
        //Hanterar själva knapptrycket "Login"
        e.preventDefault();
        const { username, password } = this.state;
        console.log(username, password);

        fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                userPass: password
            })
        })
            .then(response => response.json())
            .then((response => {
                console.log(response);
                if (response != null) {
                    this.setState({
                        // userid: response.id,
                        // username: response.userName,
                        // wantsNewsletter: response.wantsNewsletter,
                        isLoggedIn: true
                    });
                    this.props.sendUserStatus(response.id, response.userName, response.wantsNewsletter, this.state.isLoggedIn);

                    console.log("Inloggning lyckades");
                } else console.log("Inloggning misslyckades");

            }));
    }

    onLogout = () => {
        this.setState({
            id: "",
            newsletter: "",
            isLoggedIn: false,
        });
        this.props.sendUserStatus(this.state.isLoggedIn);
        window.location.reload(false);
    };

    render() {
        if (this.state.isLoggedIn === true) {
            // inloggad användare

            return (
                <div>
                    <button id="logoutBtn" className="button" onClick={this.onLogout}>Logout</button>

                </div>
            );
        } else {
            // utloggad användare
            const { username, password } = this.state;
            return (
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        id="username"
                        placeholder="Username..."
                        // bevakar förändringar i input fältet
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        id="password"
                        placeholder="Password..."
                        onChange={this.handleChange}
                    />
                    <button type="submit" id="loginBtn" className="button">
                        Login
          </button>
                </form>
            );
        }
    }
}
