import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/layout';
import SEO from '../components/seo';
import CheckoutForm from '../components/checkout';
import '../styles/bootstrap.min.css';
import '../styles/checkout.scss';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC);

const CheckoutPage = () => {
  return (
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
  );
};

export default CheckoutPage;