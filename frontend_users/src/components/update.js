
import React, { Component } from "react";

export default class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: this.props.sendUser.id,
            username: this.props.sendUser.username,
            email: this.props.sendUser.email,
            wantsNewsletter: this.props.sendUser.newsletter,
            isLoggedIn: this.props.sendUser.isLoggedIn,
        };
    }

    onCheckboxChange = (e) => {
        this.setState(initialState => ({
            wantsNewsletter: !initialState.wantsNewsletter,
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        const { userid, wantsNewsletter } = this.state;
        alert("You are submitting " + wantsNewsletter);

        fetch('http://localhost:3000/users/updateuser/' + userid, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                wantsNewsletter: wantsNewsletter
            })
        })
            .then(response => response.json())
            .then((response => {
                console.log(response);
                if (response != null) {
                    this.props.sendUserStatus(response.id, response.userName, response.wantsNewsletter, this.state.isLoggedIn);
                    console.log("uppdatering lyckades");
                } else console.log("uppdatering misslyckades");
            }));
    }

    render() {
        const { username, email } = this.state;
        return (
            <div>
                <div>
                    <form className="updateForm" onSubmit={this.handleSubmit}>
                        <h1>UserInfo</h1>
                        <div>
                            <p>Name: {username}</p>
                            <p>Email: {email}</p>
                        </div>
                        <label >
                            Do you want my newsletter?
                        <input
                                type="checkbox"
                                name="newsletter"
                                id="newsletter"
                                defaultChecked={this.state.wantsNewsletter}
                                // bevakar förändringen
                                onChange={this.onCheckboxChange}
                            />
                        </label>
                        <button type="submit">Update</button>
                    </form>

                </div>
            </div>
        );
    };
}