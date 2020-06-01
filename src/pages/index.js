import React from 'react';
import { Link, graphql } from 'gatsby';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/layout';
import SEO from '../components/seo';
import CheckoutForm from '../components/checkout';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC);

const IndexPage = (props) => {
  const moods = props.data.allMongodbHeroku8Pxd36BkMoodboards.edges;
  const { uri } = props;
  return (
    <Layout current={uri}>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
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
