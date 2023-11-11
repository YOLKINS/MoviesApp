import React, { Component } from 'react';
import { Card } from 'antd';

import AppInfo from './AppInfo';

class AppCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkImage: '',
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
  }

  render() {
    const { linkImage } = this.state;
    const { data } = this.props;

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
        cover={
          <img
            alt="Movie Poster"
            src={linkImage}
            style={{
              height: '100%',
              width: '100%',
              borderRadius: 0,
            }}
          />
        }
      >
        <AppInfo data={data} />
      </Card>
    );
  }
}

export default AppCard;
