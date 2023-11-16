import React, { Component } from 'react';
import { Card } from 'antd';

import defaultImage from '../images/images.png';

import AppInfo from './AppInfo';
import Spiner from './components/spiner';

class AppCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkImage: defaultImage,
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

    const loadComponent = loading ? <Spiner /> : null;
    const imageComponent = !loading ? <img alt="Movie Poster" src={linkImage} className="image" /> : null;

    return (
      <Card hoverable className="card" cover={{ ...loadComponent, ...imageComponent }}>
        <AppInfo data={data} />
      </Card>
    );
  }
}

export default AppCard;
