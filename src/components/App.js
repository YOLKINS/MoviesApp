import React, { Component } from 'react';
import { Online, Offline } from 'react-online-status';

import NetworkLost from '../errors/NetworkLost';

import AppFlex from './AppFlex';
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Online>
          <AppFlex />
        </Online>
        <Offline>
          <NetworkLost />
        </Offline>
      </React.Fragment>
    );
  }
}

export default App;
