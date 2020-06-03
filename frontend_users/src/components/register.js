import React from 'react';


export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: "",
            username: "",
            password: "",
            wantsNewsletter: false,
            isLoggedIn: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const { userName, userPass, email, wantsNewsletter } = this.state;
        alert("You are submitting " + userName + userPass + email + wantsNewsletter);

        fetch('http://localhost:3000/users/newuser', {
            method: 'POST',
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
        if (this.state.isLoggedIn === true) {
            const { newsletter } = this.state;
            return (
                <div>
                    <label >
                        Do you want my newsletter?
                        <input
                            type="checkbox"
                            name="newsletter"
                            value={newsletter}
                            id="newsletter"
                            // bevakar förändringen
                            onChange={this.handleNewsletterChange}
                        />
                    </label>
                </div>
            );
        }
        else {
            const { userName, userPass, email, wantsNewsletter } = this.state;
            return (
                <form className="registrationForm" onSubmit={this.handleSubmit}>
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
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter email..."
                        value={email}
                        onChange={this.handleChange}
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
                    <button type="submit">Register</button>
                </form>
            );

        }
    }
}
