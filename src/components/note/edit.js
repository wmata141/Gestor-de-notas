import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);    
    this.refCategory = firebase.firestore().collection('category');
    this.state = {
      key: '',
      title: '',
      description: '',
      category: '',
      categories: []
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('note').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          category: board.category
        });
      } else {
        console.log("No such document!");
      }
    });

    this.unsubscribe = this.refCategory.onSnapshot(this.onCollectionUpdate);
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, category } = this.state;

    const updateRef = firebase.firestore().collection('note').doc(this.state.key);
    updateRef.set({
      title,
      description,
      category
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        category: ''
      });
      this.props.history.push("/show/" + this.props.match.params.id)
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

  render() {
    return (
      <div className="container register">
        <h1><span className="yellow">UPDATE NOTE</span></h1>
        <div className="panel-body">
          <h4><Link to="/note">List Note</Link></h4>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input required type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input required type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="category">Cathegory:</label>
              <select required className="form-control" name="category" value={this.state.category} onChange={this.onChange}>
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

export default Edit;