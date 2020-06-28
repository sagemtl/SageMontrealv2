// import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import React, {useContext} from "react";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Payment from '../components/checkout';
import '../styles/bootstrap.min.css';
import '../styles/checkout.scss';
import { GlobalContext } from '../context/Provider';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC);

const CheckoutPage = () => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;
  const getTotal = () => {
    var i
    var totalPrice = 0;
    for (i = 0; i < checkoutItems.length; i += 1) {
      totalPrice += (checkoutItems[i].amount * checkoutItems[i].price)
    }
    return totalPrice;
  }
  if(getTotal() == 0){
    return(
      <div style={{textAlign: "center", position: "absolute", top: "0", left: "0", bottom: "0", right: "0", margin: "auto"}}>
        <Link to="/shop">
          <p>cart empty, click to go back to shop</p>
        </Link> 
        </div>
    );
  }
  else{
    return (
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
    );
  }
};

export default CheckoutPage;