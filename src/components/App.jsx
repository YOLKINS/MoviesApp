import React, { Component } from 'react';

import Movies from '../service/service';

import AppFlex from './AppFlex';
import AppSearch from './AppSearch';
import Spinner from './components/spinner';

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
    loading: true,
  };

  searchItem = (movieName) => {
    this.setState({ name: movieName, page: 1 });
  };

  handlePageChange = (page) => {
    console.log('Page changed to:', page);
    this.setState({ page: page });
  };

  async updatePage() {
    const { name, page } = this.state;
    if (page && name) {
      await this.movies.getMoviesName(name, page).then((res) => {
        this.setState({ moviesData: res.results, totalPages: res.totalPages, loading: false });
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
    const loading = this.state.loading;
    const componentLoading = loading ? <Spinner /> : null;
    const componentFlex = !loading ? (
      <AppFlex
        name={this.state.name}
        page={this.state.page}
        moviesData={this.state.moviesData}
        totalPages={this.state.totalPages}
        handlePageChange={this.handlePageChange}
      />
    ) : null;

    return (
      <React.Fragment>
        <AppSearch placeholder="Type to search..." searchItem={this.searchItem} style={{ margin: 50 }} />
        {componentLoading}
        {componentFlex}
      </React.Fragment>
    );
  }
}

export default AppContent;
