import React, { Component } from 'react';
import firebase from '../../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('category').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          category: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase.firestore().collection('category').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/category/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div className="container register">
        <h1><span className="yellow">SHOW CATEGORY</span></h1>

        <div className="panel-body">
          <h4><Link to="/category">List Category</Link></h4>
          <h3 className="panel-title">
            {this.state.category.title}
          </h3>
          <dl>
            <dt>Description:</dt>
            <dd>{this.state.category.description}</dd>
          </dl>
          <Link to={`/category/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">Delete</button>
        </div>
      </div>
    );
  }
}

export default Show;