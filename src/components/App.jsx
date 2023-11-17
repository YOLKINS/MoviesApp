import React, { Component } from 'react';

import Movies from '../service/service';

import AppFlex from './AppFlex';
import AppSearch from './AppSearch';

class AppContent extends Component {
  constructor() {
    super();

    this.movies = new Movies();
  }

  state = {
    moviesData: [],
    name: 'return',
    page: 1,
    totalPages: 1,
  };

  searchItem = (movieName) => {
    this.setState({ name: movieName });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }, () => {
      this.fetchData();
    });
  };

  async updatePage() {
    const { name, page } = this.state;
    if (page && name) {
      await this.movies.getMoviesName(name, page).then((res) => {
        this.setState({ moviesData: res.results, totalPages: res.totalPages });
      });
    }
  }

  async componentDidMount() {
    this.updatePage();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name || this.state.page !== prevState.page) {
      this.updatePage();
    }
  }

  render() {
    return (
      <React.Fragment>
        <AppSearch placeholder="Type to search..." searchItem={this.searchItem} />
        <AppFlex
          name={this.state.name}
          page={this.state.page}
          moviesData={this.state.moviesData}
          totalPages={this.state.totalPages}
        />
      </React.Fragment>
    );
  }
}

export default AppContent;
