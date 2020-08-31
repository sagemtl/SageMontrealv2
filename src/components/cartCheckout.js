import React, { useContext } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import CartItem from './cartItem';

import { GlobalContext } from '../context/Provider';

const CartCheckout = ({ isMobile }) => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  return (
    <div className="cart-checkout">
      {checkoutItems.map((item) => {
        return (
          <CartItem
            id={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            size={item.size}
            image={item.image}
            sku={item.sku}
            key={item.sku}
            isCheckout={true}
          />
        );
      })}
    </div>
  );
};

CartCheckout.propTypes = {
    isMobile: PropTypes.bool.isRequired,
  };

export default CartCheckout;