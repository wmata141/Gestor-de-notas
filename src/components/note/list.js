import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';
import './note.css';

function searchingFor(term){
    return function(x) {
        return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('note');
        this.unsubscribe = null;
        this.state = {
            note: [],
            term:''
        };
        this.searchHandle = this.searchHandle.bind(this);
    }

    onCollectionUpdate = (querySnapshot) => {
        const note = [];
        querySnapshot.forEach((doc) => {
            const { title, description, category } = doc.data();
            note.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                description,
                category,
            });
        });
        this.setState({
            note
        });
    }   

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    searchHandle(event) {
        this.setState({
            term: event.target.value
        })
    }

    render() {
        let { term, note } = this.state;
        return (
            <div className="container register">
                <h1><span className="yellow">NOTE LIST</span></h1>
                <h4><Link to="/create">Add Note</Link></h4>

                <div className="form-group">
                    <input value={term}required type="text" onChange={this.searchHandle} placeholder="Title" />
                </div>

                <table className="container register">
                    <thead>
                        <tr>
                            <th><h1>Title</h1></th>
                            <th><h1>Description</h1></th>
                            <th><h1>Category</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {note.filter(searchingFor(term)).map(board =>
                            <tr key={board.key}>
                                <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                                <td>{board.description}</td>
                                <td>{board.category}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;