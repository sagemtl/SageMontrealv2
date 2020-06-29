import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CartItem from './cartItem';

import { GlobalContext } from '../context/Provider';

const Cart = ({ isMobile }) => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  return (
    <div className="cart" style={isMobile ? { right: 20, top: 80 } : {}}>
      {checkoutItems.map((item) => {
        return (
          <CartItem
            id={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            size={item.size}
            image={item.image}
          />
        );
      })}
      {checkoutItems.length > 0 && (
        <button type="submit" onClick="" className="cart__button">
          Checkout
        </button>
      )}
    </div>
  );
};

Cart.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Cart;
