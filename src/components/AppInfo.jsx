import React, { Component } from 'react';
import { Button, Typography } from 'antd';
import { format, parseISO } from 'date-fns';

const { Text, Title: T, Paragraph: P } = Typography;
class AppInfo extends Component {
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
    width: 46,
    height: 20,
    borderRadius: 2,
    border: '1px solid #d9d9d9',
    background: '#fafafa',
    padding: 0,
    textAlign: 'center',
    marginRight: 8,
    ...this.textStyles,
    ...this.textStylesButton,
  };

  render() {
    let { title, overview, release_date } = this.props.data;

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
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          {title}
        </T>
        <Text
          style={{
            ...this.textStyles,
            ...this.textStylesButton,
          }}
        >
          {release_date}
        </Text>
        <P>
          <Button style={{ ...this.buttonStyle }}>Action</Button>
          <Button style={{ ...this.buttonStyle }}>Drama</Button>
        </P>
        <P
          ellipsis={{
            rows: 6,
          }}
          style={{ ...this.textStyles, fontSize: 12, verticalAlign: 'top' }}
        >
          {overview}
        </P>
      </section>
    );
  }
}

export default AppInfo;
