import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);    
    this.refTask = firebase.firestore().collection('task');
    this.state = {
      key: '',
      title: '',
      description: '',
      date: ''
    };
  }

  componentDidMount() {
    const refTask = firebase.firestore().collection('task').doc(this.props.match.params.id);
    refTask.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          description: board.description,
          date: board.date
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

    const { title, description, date } = this.state;

    const updateRef = firebase.firestore().collection('task').doc(this.state.key);
    updateRef.set({
      title,
      description,
      date
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        description: '',
        date: ''
      });
      this.props.history.push("/task/show/" + this.props.match.params.id)
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    return (
      <div className="container register">
        <h1><span className="yellow">UPDATE NOTE</span></h1>
        <div className="panel-body">
          <h4><Link to="/task">List Note</Link></h4>
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
              <label htmlFor="date">Date:</label>            
              <input required type="date" className="form-control" name="date" value={this.state.date} onChange={this.onChange} />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Edit;