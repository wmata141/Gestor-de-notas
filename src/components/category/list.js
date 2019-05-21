import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';
import './category.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('category');
        this.unsubscribe = null;
        this.state = {
            category: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const category = [];
        querySnapshot.forEach((doc) => {
            const { title, description } = doc.data();
            category.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                description
            });
        });
        this.setState({
            category
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        return (
            <div className="container register">
                <h1><span className="yellow">CATEGORY LIST</span></h1>
                <h4><Link to="/category/create">Add Category</Link></h4>
                <table className="container register">
                    <thead>
                        <tr>
                            <th><h1>Title</h1></th>
                            <th><h1>Description</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.category.map(category =>
                            <tr key={category.key}>
                                <td><Link to={`/category/show/${category.key}`}>{category.title}</Link></td>
                                <td>{category.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;