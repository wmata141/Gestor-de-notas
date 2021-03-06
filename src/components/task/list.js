import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase';
import './task.css';

function searchingFor(term){
    return function(x) {
        return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('task');
        this.unsubscribe = null;
        this.state = {
            task: [],
            term:''
        };
        this.searchHandle = this.searchHandle.bind(this);
    }

    onCollectionUpdate = (querySnapshot) => {
        const task = [];
        querySnapshot.forEach((doc) => {
            const { title, description, date } = doc.data();
            task.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                description,
                date,
            });
        });
        this.setState({
            task
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
        let { term, task } = this.state;
        return (
            <div className="container register">
                <h1><span className="yellow">TASK LIST</span></h1>
                <h4><Link to="/task/create">Add Task</Link></h4>

                <div className="form-group">
                    <input value={term}required type="text" onChange={this.searchHandle} placeholder="Title" />
                </div>

                <table className="container register">
                    <thead>
                        <tr>
                            <th><h1>Title</h1></th>
                            <th><h1>Description</h1></th>
                            <th><h1>Date</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {task.filter(searchingFor(term)).map(board =>
                            <tr key={board.key}>
                                <td><Link to={`/task/show/${board.key}`}>{board.title}</Link></td>
                                <td>{board.description}</td>
                                <td>{board.date}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;