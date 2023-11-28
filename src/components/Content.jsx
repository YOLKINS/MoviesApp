import React, { Component } from 'react';

import Movies from '../service/serviceMovies';

import Cards from './Cards';
import AppSearch from './Search';
import Spinner from './components/spinner';

class Content extends Component {
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

  async componentWillUnmount() {
    this.setState({ moviesData: [] });
  }

  render() {
    const { guestSessionId } = this.props;
    console.log(`Проверка guestSessionId при render AppContent: ${guestSessionId}`);
    const loading = this.state.loading;
    const componentLoading = loading ? <Spinner /> : null;
    const componentFlex = !loading ? (
      <Cards
        name={this.state.name}
        page={this.state.page}
        moviesData={this.state.moviesData}
        totalPages={this.state.totalPages}
        handlePageChange={this.handlePageChange}
        guestSessionId={guestSessionId}
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

export default Content;
