import React from 'react';
import { navigate } from 'gatsby';
import Layout from '../components/layout';

import '../styles/404.scss';

const NotFoundPage = ({ uri }) => (
  <Layout current={uri} hideCart>
    <div className="not-found">
      <h1 className="not-found__header">404 | NOT FOUND</h1>
      <p className="not-found__text">
        You just hit a route that doesn&#39;t exist... the sadness.
      </p>
      <p className="not-found__text">Please continue exploring below</p>
      <div className="not-found-buttons">
        <button
          className="not-found__button"
          type="button"
          onClick={() => navigate('/')}
        >
          Home
        </button>
        <button
          className="not-found__button"
          type="button"
          onClick={() => navigate('/shop')}
        >
          Boutique
        </button>
        <button
          className="not-found__button"
          type="button"
          onClick={() => navigate('/lookbook')}
        >
          Lookbook
        </button>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
