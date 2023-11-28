import React, { Component } from 'react';

import Session from '../service/serviceSession';

import AppFlex from './Cards';
import Spinner from './components/spinner';

class Rated extends Component {
  constructor() {
    super();

    this.session = new Session();
  }

  state = {
    ratedMovies: [],
    page: 1,
    totalPages: 1,
    loading: true,
  };

  handlePageChange = (page) => {
    this.setState({ page: page });
  };

  async updateRatedMovies() {
    const { apiKey, guestSessionId } = this.props;
    const { page } = this.state;
    if (apiKey && guestSessionId) {
      await this.session.getRatedMovies(apiKey, guestSessionId, page).then((res) => {
        console.log('должен поместиться в ratedMovies', res.results);
        this.setState({ ratedMovies: res.results, totalPages: res.totalPages, loading: false });
      });
    }
  }

  async componentDidMount() {
    console.log('componentDidMount() y AppRated');
    this.updateRatedMovies();
  }

  render() {
    const loading = this.state.loading;
    const componentLoading = loading ? <Spinner /> : null;
    const componentFlex = !loading ? (
      <AppFlex
        name={this.state.name}
        page={this.state.page}
        moviesData={this.state.ratedMovies}
        totalPages={this.state.totalPages}
        handlePageChange={this.handlePageChange}
      />
    ) : null;

    return (
      <React.Fragment>
        {componentLoading}
        {componentFlex}
      </React.Fragment>
    );
  }
}

export default Rated;
