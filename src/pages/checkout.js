import React, { useContext, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Payment from '../components/checkout';
import './styles/bootstrap.min.css';
import './styles/checkout.scss';
import { GlobalContext } from '../context/Provider';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLIC);

const CheckoutPage = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    </>
  );
};

export default CheckoutPage;
