import React, {Component} from 'react';
import Main from './components/mainComponent'
import './App.css';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {

  render(){
  return (
    <BrowserRouter>
    <div>
      <Main/>
    </div>
    </BrowserRouter>
  );
  }
  //Usage of reactstrap elements and bootstrap classes to style the page
  //reactstrap is a library that enables the JS bootstrap components to work with react
}

export default App;
