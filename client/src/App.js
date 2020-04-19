import React, { Component } from 'react';

import Signin from './components/Signin';
import Register from './components/auth/Register'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';

import { Provider } from 'react-redux';
import store from './store';


import { loadUser } from './actions/authActions'; 


class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }
  
  render() {
    return (
      <Provider store= {store}>
        <div className="App">
          <AppNavbar/>
          <Signin/>
          <Register/>
          
        </div>
      </Provider>
    );
  }
}

export default App;
