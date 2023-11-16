import React from 'react';
import { Spin } from 'antd';

const Spiner = () => {
  return (
    <div className="spiner">
      <Spin tip="Loading" size="large" />
    </div>
  );
};

export default Spiner;
