import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('category');
    this.state = {
      title: '',
      description: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description } = this.state;

    this.ref.add({
      title,
      description
    }).then((docRef) => {
      this.setState({
        title: '',
        description: ''
      });
      this.props.history.push("/category")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { title, description } = this.state;
    return (
      <div className="container register">
        <h1><span className="yellow">ADD CATEGORY</span></h1>
        <div className="panel-body">
          <h4><Link to="/category">List Category</Link></h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input required type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea required className="form-control" name="description" value={description} onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textarea>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;