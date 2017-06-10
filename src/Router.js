import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import SavedVideos from './components/SavedVideos';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="App Name" />
      </Scene>

      <Scene key="main">
        <Scene
          key="search"
          component={Search}
          title="Search"
          initial
        />

        <Scene
          key="searchResults"
          component={SearchResults}
          title="Search Results"
        />

        <Scene
          key="savedVideos"
          component={SavedVideos}
          title="Saved Videos"
        />
      </Scene>

    </Router>
  );
};

export default RouterComponent;
