import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';
import Reducers from './reducers';

class App extends Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyCsQvRTyBB7xANR58xLcBm-S1NVCKRGz3Y",
      authDomain: "task-61168.firebaseapp.com",
      databaseURL: "https://task-61168.firebaseio.com",
      projectId: "task-61168",
      storageBucket: "task-61168.appspot.com",
      messagingSenderId: "656550986646"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
