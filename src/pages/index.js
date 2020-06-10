import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/layout';
import SEO from '../components/seo';
import CheckoutForm from '../components/checkout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC);

const IndexPage = ({ data, uri }) => {
  const moods = data.allMongodbHeroku8Pxd36BkMoodboards.edges;
  return (
    <Layout current={uri}>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div>
        {moods.map((mood) => (
          <div key={mood.node.id}>
            <img width="300px" src={mood.node.imagePath} alt="Sage mood" />
            <h2>{mood.node.name}</h2>
            <p>{mood.node.instagram}</p>
          </div>
        ))}
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape().isRequired,
  uri: PropTypes.string.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMongodbHeroku8Pxd36BkMoodboards {
      edges {
        node {
          id
          name
          instagram
          imagePath
        }
      }
    }
  }
`;
