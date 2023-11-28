import React, { Component } from 'react';
import { Typography, Rate } from 'antd';
import { format, parseISO } from 'date-fns';

import Session from '../service/serviceSession';

import Vote from './components/vote';
import Genre from './components/genre';

const { Text, Title: T, Paragraph: P } = Typography;

class CardInfo extends Component {
  constructor() {
    super();

    this.session = new Session();
  }

  state = {
    storedRating: 0,
  };

  handleChangeRate = async (rating) => {
    const { guestSessionId, data } = this.props;
    const storageKey = `movieRating_${data.id}`;
    await this.session.rateMovie(rating, data.id, guestSessionId).then((res) => {
      if (res) {
        localStorage.setItem(storageKey, rating);
        this.setState({ storedRating: rating });
      }
    });
  };

  getStoredRating = () => {
    const { data } = this.props;
    const storageKey = `movieRating_${data.id}`;
    const rating = Number(localStorage.getItem(storageKey)) || 0;
    if (rating) {
      return rating;
    }
  };

  componentDidMount() {
    this.setState({ storedRating: this.getStoredRating() });
  }

  textStyles = {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
  };

  textStylesButton = {
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: 12,
  };

  buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: 5,
    height: 20,
    borderRadius: 2,
    border: '1px solid #d9d9d9',
    background: '#fafafa',
    textAlign: 'center',
    marginRight: 8,
    ...this.textStyles,
    ...this.textStylesButton,
  };

  render() {
    let { title, overview, release_date, vote_average, genre_ids } = this.props.data;

    const vote = <Vote voteAverage={vote_average} />;

    if (release_date) {
      release_date = format(parseISO(release_date), 'MMMM d, y');
    }

    return (
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 228,
          height: '100%',
        }}
      >
        <T
          style={{
            ...this.textStyles,
            fontSize: 20,
            margin: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {title}
          {vote}
        </T>
        <Text
          style={{
            ...this.textStyles,
            ...this.textStylesButton,
          }}
        >
          {release_date}
        </Text>
        <P style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Genre genreIds={genre_ids} buttonStyle={this.buttonStyle} />
        </P>
        <P
          ellipsis={{
            rows: 5,
          }}
          style={{ ...this.textStyles, fontSize: 12, verticalAlign: 'top' }}
        >
          {overview}
        </P>
        <Rate
          defaultValue={0}
          count={10}
          value={this.state.storedRating}
          onChange={this.handleChangeRate}
          style={{ fontSize: 15 }}
        />
      </section>
    );
  }
}

export default CardInfo;
