import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../styles/index.scss';
import classNames from 'classnames';

const IndexPage = ({ uri }) => {
  const [swap, setSwap] = useState(true);

  const indexClass = classNames({
    index: swap,
    'index-flip': !swap,
  });

  return (
    <Layout current={uri} footerTransparent hideCart>
      <SEO title="Home" />
      <div className={indexClass}>
        <label className="index-toggle">
          <input type="checkbox" />
          <span
            onClick={() => setSwap(!swap)}
            className="index-toggle__slider"
          />
        </label>
        <div className="index-text">
          <h1 className="index-text__header--main">
            <b>Sage Montreal</b>
          </h1>
          <h2 className="index-text__header--1">We'll be back soon!</h2>
          <h2 className="index-text__header--2">66666</h2>
          <h2 className="index-text__header--3">66666</h2>
          <h2 className="index-text__header--4">仙仙仙</h2>
          <h2 className="index-text__header--5">仙仙仙</h2>
        </div>
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default IndexPage;
