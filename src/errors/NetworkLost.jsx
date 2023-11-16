import React from 'react';
import { Space, Alert } from 'antd';

const NetworkLost = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Error" type="error" showIcon />
      <Alert message="Internet connection lost" type="error" />
    </Space>
  );
};

export default NetworkLost;
