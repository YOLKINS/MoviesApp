import React, { Component } from 'react';
import { Online, Offline } from 'react-online-status';

import NetworkLost from '../errors/NetworkLost';

import AppContent from './App';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Online>
          <AppContent />
        </Online>
        <Offline>
          <NetworkLost />
        </Offline>
      </React.Fragment>
    );
  }
}

export default App;
