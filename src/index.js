import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import firebase from './Firebase.js'
import * as serviceWorker from './serviceWorker';

import App from './App';
import Menu from './components/menu/menu.ts'
import Login from './components/login/login';

import List from './components/note/list';
import Show from './components/note/show';
import Create from './components/note/create';
import Edit from './components/note/edit';
  
import ListCategory from './components/category/list';
import ShowCategory from './components/category/show';
import CreateCategory from './components/category/create';
import EditCategory from './components/category/edit';

import PrivateRoute from './PrivateRoute';

class AppRouter extends React.Component {
  state = { loading: true, authenticated: false, user: null };

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  render() {
    const { authenticated, loading } = this.state;

    if (loading) {
      return <p>Loading..</p>;
    }

    return (
      <Router>
        <div>
          <Menu></Menu>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />

            <PrivateRoute exact path="/note" component={List} authenticated={authenticated} />
            <PrivateRoute path="/edit/:id" component={Edit} authenticated={authenticated} />
            <PrivateRoute path="/create" component={Create} authenticated={authenticated} />
            <PrivateRoute path="/show/:id" component={Show} authenticated={authenticated} />

            <PrivateRoute exact path="/category" component={ListCategory} authenticated={authenticated} />
            <PrivateRoute path="/category/create" component={CreateCategory} authenticated={authenticated} />
            <PrivateRoute path="/category/show/:id" component={ShowCategory} authenticated={authenticated} />
            <PrivateRoute path="/category/edit/:id" component={EditCategory} authenticated={authenticated} />
          </Switch>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<AppRouter />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


