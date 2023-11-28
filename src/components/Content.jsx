import React, { Component } from 'react';

import Movies from '../service/serviceMovies';
import { NotFoundMovies } from '../errors/Errors';

import CardList from './CardList';
import Spinner from './components/spinner';
import SearchForm from './Search';

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
    const { loading, moviesData } = this.state;
    const componentLoading = loading ? <Spinner /> : null;
    const componentNotFound = !loading && moviesData.length == 0 ? <NotFoundMovies /> : null;
    const componentFlex = !loading ? (
      <CardList
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
        <SearchForm placeholder="Type to search..." searchItem={this.searchItem} style={{ margin: 50 }} />
        {componentLoading}
        {componentNotFound}
        {componentFlex}
      </React.Fragment>
    );
  }
}

export default Content;
