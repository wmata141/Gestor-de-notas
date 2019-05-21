import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('category').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description } = this.state;

    const updateRef = firebase.firestore().collection('category').doc(this.state.key);
    updateRef.set({
      title,
      description
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: ''
      });
      this.props.history.push("/category/show/" + this.props.match.params.id)
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div className="container register">
        <h1><span className="yellow">UPDATE CATEGORY</span></h1>
        <div className="panel-body">
          <h4><Link to="/">List Category</Link></h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Edit;