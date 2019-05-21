import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.refNote = firebase.firestore().collection('note');
    this.refCategory = firebase.firestore().collection('category');
    this.state = {
      title: '',
      description: '',
      category: '',
      categories: []
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, category } = this.state;
    console.log("this.state", this.state);

    this.refNote.add({
      title,
      description,
      category
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        category: ''
      });
      this.props.history.push("/note")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  onCollectionUpdate = (querySnapshot) => {
    const categories = [];
    querySnapshot.forEach((doc) => {
      const { title, description } = doc.data();
      categories.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description
      });
    });
    this.setState({
      categories
    });
    console.log("categories[]", categories);

  }

  componentDidMount() {
    this.unsubscribe = this.refCategory.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const { title, description, category } = this.state;
    return (
      <div className="container register">
        <h1><span className="yellow">ADD NOTE</span></h1>
        <div className="panel-body">
          <h4><Link to="/note">List Note</Link></h4>
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
              <label htmlFor="category">Category:</label>
              <select required className="form-control" name="category" value={category} onChange={this.onChange}>
                <option value="">Select a Category</option>
                {this.state.categories.map(board =>
                  <option value={board.title}>{board.title}</option>
                )}
              </select>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;