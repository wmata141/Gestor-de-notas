import React, { Component } from 'react';
import firebase from '../../Firebase';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {        
        this.props.history.push('/');
      })
      .catch(error => {
        console.log("Email or Password Incorrect");
        alert("Email or Password Incorrect");
        this.setState({ error });        
      });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="container register">
        <h1><span className="yellow">LOGIN</span></h1>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input required type="email" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input required type="password" className="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;