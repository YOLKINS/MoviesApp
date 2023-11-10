import React from 'react';
import { Typography, ConfigProvider } from 'antd';

const { Text, Title: T, Paragraph: P } = Typography;

const AppInfo = () => (
  <section
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: 228,
      height: '100%',
    }}
  >
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          titleMarginBottom: 2,
          titleMarginTop: 2,

          // Alias Token
          colorBgContainer: '#f6ffed',
        },
      }}
    >
    <P>
      <T>
        <span className="text text__title">The way back</span>
      </T>
      <Text>
        <span className="text text__description">
          A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
          attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
        </span>
      </Text>
    </P>
    </ConfigProvider>
  </section>
);

export default AppInfo;