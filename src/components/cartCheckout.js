import React, { useContext, useEffect} from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import CheckoutItem from './checkoutItem';

import { GlobalContext } from '../context/Provider';

const CartCheckout = () => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  useEffect(() => {
    console.log(checkoutItems);
  });

  return (
    <div className="cart-checkout">
      {checkoutItems.map((item) => {
        return (
          <CheckoutItem
            name={item.name}
            amount={item.amount}
            size={item.size}
            price={item.price}
            image={item.image}
            id={item.id}
            skuId={item.skuId}
            prodMetadata={item.prodMetadata}
            key={item.id}
          />
        );
      })}
    </div>
  );
};

export default CartCheckout;