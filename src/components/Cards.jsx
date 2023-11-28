import React, { Component } from 'react';
import { Flex, Alert, Space, Pagination } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';

import Movies from '../service/serviceMovies';

import AppCard from './Card';

class Cards extends Component {
  constructor() {
    super();

    this.movies = new Movies();
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
    const { moviesData, totalPages, page, handlePageChange, guestSessionId } = this.props;

    return (
      <ErrorBoundary FallbackComponent={this.ErrorFallback}>
        <Flex wrap="wrap" gap="large" className="flex">
          {moviesData.map((movie) => (
            <AppCard key={movie.id} data={movie} movies={this.movies} guestSessionId={guestSessionId} />
          ))}
        </Flex>
        <Pagination
          total={totalPages}
          current={page}
          onChange={handlePageChange}
          showTotal={(totalPages) => `Total ${totalPages} pages`}
        />
      </ErrorBoundary>
    );
  }
}

export default Cards;
