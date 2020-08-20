// import React from 'react';
import React, { useContext } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Payment from '../components/checkout';
import './styles/bootstrap.min.css';
import './styles/checkout.scss';
import { GlobalContext } from '../context/Provider';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC);

const CheckoutPage = () => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;
  const getTotal = () => {
    let i;
    let totalPrice = 0;
    for (i = 0; i < checkoutItems.length; i += 1) {
      totalPrice += checkoutItems[i].amount * checkoutItems[i].price;
    }
    return totalPrice;
  };
  const cartIsEmpty = () => {
    return checkoutItems.length <= 0;
  };

  if (cartIsEmpty()) {
    return (
      <div>
        <div
          style={{
            zIndex: '2',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            textAlign: 'center',
          }}
        >
          <a
            className="empty-Cart-Link"
            href="/shop"
            style={{ position: 'relative', top: '30vh', fontWeight: 'bold' }}
          >
            <p>CART EMPTY, CLICK TO RETURN TO SHOP</p>
          </a>
          <img
            style={{ height: '100px', display: 'inline-block' }}
            src="https://res.cloudinary.com/sage-montreal/image/upload/v1588341601/LOGO_x1kbox.png"
          />
        </div>
        <div className="empty-Cart">
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </div>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
};

export default CheckoutPage;
