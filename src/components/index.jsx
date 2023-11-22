import React, { Component } from 'react';
import { Online, Offline } from 'react-online-status';

import Movies from '../service/serviceMovies';
import NetworkLost from '../errors/NetworkLost';

import { MovieServiceProvider } from './service-movie-context/movieContext';
import AppTabs from './AppTabs';
class App extends Component {
  constructor() {
    super();

    this.movies = new Movies();
  }
  render() {
    return (
      <MovieServiceProvider value={this.movies}>
        <Online>
          <AppTabs />
        </Online>
        <Offline>
          <NetworkLost />
        </Offline>
      </MovieServiceProvider>
    );
  }
}

export default App;
