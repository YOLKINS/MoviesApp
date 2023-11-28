import React, { Component } from 'react';
import { Tabs } from 'antd';

import Session from '../service/serviceSession';

import Content from './Content';
import Spinner from './components/spinner';
import Rated from './Rated';

class AppTabs extends Component {
  constructor(props) {
    super(props);
    this.session = new Session();
  }

  state = {
    activeKey: '1',
    apiKey: '8c732bd60777d18cfd9d587aaaf66062',
    guestSessionId: null,
  };

  onChange = (key) => {
    this.setState({ activeKey: key });
  };

  async updateSession() {
    const { apiKey } = this.state;
    const storedGuestSessionId = localStorage.getItem('guestSessionId');
    if (storedGuestSessionId) {
      this.setState({ guestSessionId: storedGuestSessionId });
    } else {
      await this.session.getSessionID(apiKey).then((res) => {
        localStorage.setItem('guestSessionId', res);
        this.setState({ guestSessionId: res });
      });
    }
  }
  async componentDidMount() {
    await this.updateSession();
  }

  render() {
    let items = [
      {
        key: '1',
        label: 'Search',
        children: this.state.guestSessionId ? <Content guestSessionId={this.state.guestSessionId} /> : <Spinner />,
      },
      {
        key: '2',
        label: 'Rated',
        children: this.state.guestSessionId ? (
          <Rated apiKey={this.state.apiKey} guestSessionId={this.state.guestSessionId} />
        ) : (
          <Spinner />
        ),
      },
    ];

    return <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} items={items} onChange={this.onChange} />;
  }
}

export default AppTabs;
