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
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;
  const [cartEmpty, setCartEmpty] = useState(false);

  const isCartEmpty = () => {
    if (
      typeof window !== `undefined` &&
      cartEmpty !== checkoutItems.length <= 0
    ) {
      setCartEmpty(checkoutItems.length <= 0);
    }
    return cartEmpty;
  };

  isCartEmpty();

  return (
    <>
      {cartEmpty && (
        <div className="empty-cart">
          <a className="empty-cart__link" href="/shop">
            <p>CART EMPTY, CLICK TO RETURN TO SHOP</p>
          </a>
          <img
            className="empty-cart__image"
            src="https://res.cloudinary.com/sage-montreal/image/upload/v1588341601/LOGO_x1kbox.png"
            alt="Sage logo empty"
          />
        </div>
      )}
      <div className={cartEmpty && 'empty-checkout-page'}>
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      </div>
    </>
  );
};

export default CheckoutPage;
