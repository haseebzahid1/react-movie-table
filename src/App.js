import React, {Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.css";   

import Movies from './component/Movie';

class App extends Component {
  render() { 
    return (
      <div>
         {/* <i className="far fa-heart"></i> */}
        <Movies />
      </div>
    );
  }
}
 
export default App;
