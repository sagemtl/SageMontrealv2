import React, { useState } from 'react';

import Layout from '../components/layout';
import '../styles/wheelTest.scss';

const wheelTest = () => {
  const [paused, setPaused] = useState(false);

  const products = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
  ];

  return (
    <Layout>
      <div className="container">
        <div className="inner">
          {products.map((product) => {
            return (
              <div
                className="item"
                style={paused ? { animationPlayState: 'paused' } : {}}
                onMouseEnter={() => {
                  setPaused(true);
                }}
                onMouseLeave={() => {
                  setPaused(false);
                }}
              >
                {product}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default wheelTest;
