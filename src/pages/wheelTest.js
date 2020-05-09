import React from 'react';

import Layout from '../components/layout';
import '../styles/wheelTest.scss';

const wheelTest = () => {
  return (
    <Layout>
      <div className="container">
        <div className="inner">
          <div className="item">Item 1</div>
          <div className="item">Item 2</div>
          <div className="item">Item 3</div>
          <div className="item">Item 4</div>
          <div className="item">Item 5</div>
          <div className="item">Item 6</div>
          <div className="item">Item 7</div>
          <div className="item">Item 8</div>
        </div>
      </div>
    </Layout>
  );
};

export default wheelTest;
