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
    count: 0,
  };

  handleChangeRate = async (rating) => {
    const { guestSessionId } = this.props;
    console.log(`На сколько оценен фильм? ${rating}`);
    await this.session.rateMovie(rating, this.props.data.id, guestSessionId).then((res) => {
      if (res) {
        this.setState({ count: rating });
      }
    });
  };

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
        <P style={{ display: 'flex' }}>
          <Genre genreIds={genre_ids} buttonStyle={this.buttonStyle} />
        </P>
        <P
          ellipsis={{
            rows: 6,
          }}
          style={{ ...this.textStyles, fontSize: 12, verticalAlign: 'top' }}
        >
          {overview}
        </P>
        <Rate defaultValue={0} count={10} value={this.state.count} onChange={this.handleChangeRate} />
      </section>
    );
  }
}

export default CardInfo;
