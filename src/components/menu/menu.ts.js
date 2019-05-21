import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import firebase, { auth } from '../../Firebase.js'
import './menu.css';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = { user: null }
    }

    logOutUser = () => {
        firebase.auth().signOut()
            .then(window.location = "/");
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
            }
        })
    };

    render() {
        return (
            <div className="menu">
                <ul>
                    <li><Link to="/">Notes Manager</Link></li>
                    <li><Link to="/note">Notes</Link></li>
                    <li><Link to="/task">Tasks</Link></li>
                    <li><Link to="/category">Categories</Link></li>
                    <li><a href="/" onClick={this.logOutUser}>Logout</a></li>
                </ul>
                <br />
            </div>

        );
    }
}

export default Menu;