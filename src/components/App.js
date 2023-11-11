import React, { Component } from 'react';
import { Flex } from 'antd';

import Movies from '../service/service';

import AppCard from './AppCard';
class App extends Component {
  constructor() {
    super();
    this.state = {
      moviesData: [],
    };
    this.movies = new Movies();
  }

  async fetchData() {
    const res = await this.movies.getMoviesName('return', 1);
    this.setState({ moviesData: res });
  }

  async componentDidMount() {
    await this.fetchData();
  }

  render() {
    const { moviesData } = this.state;

    return (
      <Flex
        wrap="wrap"
        gap="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 20,
          background: '#FFF',
        }}
      >
        {moviesData.map((movie) => (
          <AppCard key={movie.id} data={movie} movies={this.movies} />
        ))}
      </Flex>
    );
  }
}

export default App;
