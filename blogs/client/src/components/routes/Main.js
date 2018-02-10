import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Register from '../auth/components/Registration.jsx';
import Login from '../auth/components/Login.jsx';
import Blog from '../blogs/components/Blog';

class Main extends Component {
  render() {
    return (
      <main>
          <Switch>
              <Route exact path="/" component={Blog}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
        </Switch>
      </main>
    );
  }
}

export default Main;