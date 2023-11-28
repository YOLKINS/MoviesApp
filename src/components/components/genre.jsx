import React, { Component } from 'react';
import { Button } from 'antd';

import Movies from '../../service/serviceMovies';

export default class Genre extends Component {
  constructor() {
    super();

    this.movies = new Movies();
  }

  state = {
    genreNames: [],
  };

  async updateGenreOfMovie() {
    const { genreIds } = this.props;

    if (genreIds) {
      await this.movies.getGenreOfMovie(genreIds).then((res) => {
        this.setState({ genreNames: res });
      });
    }
  }

  async componentDidMount() {
    this.updateGenreOfMovie();
  }

  render() {
    const { genreNames } = this.state;
    const { buttonStyle } = this.props;
    return (
      <React.Fragment>
        {genreNames.map((name, index) => (
          <Button key={index} style={{ ...buttonStyle }}>
            {name}
          </Button>
        ))}
      </React.Fragment>
    );
  }
}
