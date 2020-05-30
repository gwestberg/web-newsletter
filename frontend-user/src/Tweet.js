import React from 'react';
import App from './App';
import './App.css';

function Tweet({name, message, nolikes}) {
    return(
        <div className="tweet">

            <h3>{name}</h3>
            <p>{message}</p>
            <h3>{nolikes}</h3>

        </div>
    )
}
export default Tweet;