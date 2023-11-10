import React from 'react';
import { Card } from 'antd';

import AppInfo from './AppInfo';

const AppCard = () => (
  <Card
    hoverable
    style={{
      width: 451,
      height: 279,
      display: 'flex',
      borderRadius: 0,
    }}
    cover={
      <img
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 0,
        }}
      />
    }
  >
    <AppInfo />
  </Card>
);

export default AppCard;
