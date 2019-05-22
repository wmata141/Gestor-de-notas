import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.reftask = firebase.firestore().collection('task');
    this.state = {
      title: '',
      description: '',
      date: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, date } = this.state;
    console.log("this.state", this.state);

    this.reftask.add({
      title,
      description,
      date
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        date: ''
      });
      this.props.history.push("/task")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { title, description, date } = this.state;
    return (
      <div className="container register">
        <h1><span className="yellow">ADD TASK</span></h1>
        <div className="panel-body">
          <h4><Link to="/task">List Task</Link></h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input required type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea required className="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textarea>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input required type="date" className="form-control" name="date" value={date} onChange={this.onChange} placeholder="Date" />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;