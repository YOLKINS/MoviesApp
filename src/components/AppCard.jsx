import React, { Component } from 'react';
import { Card, Spin } from 'antd';

import AppInfo from './AppInfo';

class AppCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkImage: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const { movies, data } = this.props;
    const res = await movies.getMoviesImage(data.id);
    if (res) {
      const link = `https://image.tmdb.org/t/p/original${res}`;
      if (link) {
        this.setState({ linkImage: link });
      }
    }
    this.setState({ loading: false });
  }

  render() {
    const { linkImage, loading } = this.state;
    const { data } = this.props;

    const loadComponent = loading ? <Spin tip="Loading" size="large" /> : null;
    const imageComponent = !loading ? (
      <img
        alt="Movie Poster"
        src={linkImage}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 0,
        }}
      />
    ) : null;

    return (
      <Card
        hoverable
        className="card"
        style={{
          width: 451,
          height: 279,
          display: 'flex',
          borderRadius: 0,
        }}
        cover={{ ...loadComponent, ...imageComponent }}
      >
        <AppInfo data={data} />
      </Card>
    );
  }
}

export default AppCard;
