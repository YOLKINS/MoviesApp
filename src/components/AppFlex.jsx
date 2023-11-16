import React, { Component } from 'react';
import { Flex, Alert, Space } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';

import Movies from '../service/service';

import AppCard from './AppCard';

class AppFlex extends Component {
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

  ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Alert message={error.message} type="error" />
        <button onClick={resetErrorBoundary}>Try again</button>
      </Space>
    );
  }

  render() {
    const { moviesData } = this.state;

    return (
      <ErrorBoundary FallbackComponent={this.ErrorFallback}>
        <Flex wrap="wrap" gap="large" className="flex">
          {moviesData.map((movie) => (
            <AppCard key={movie.id} data={movie} movies={this.movies} />
          ))}
        </Flex>
      </ErrorBoundary>
    );
  }
}

export default AppFlex;
