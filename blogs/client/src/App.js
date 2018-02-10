import React, { Component } from 'react';
import Main from './components/routes/Main';
import Navbar from './components/routes/Navbar';

class App extends Component {
  render() {
    return (
      <div>
          <Navbar/>
          <div className="container">
            <br/>
            <Main/>
          </div>
        </div>
    );
  }
}

export default App;
