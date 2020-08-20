import React, { useContext } from 'react';
import { Link } from 'gatsby';
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
            sku={item.sku}
            key={item.sku}
          />
        );
      })}
      {checkoutItems.length > 0 && (
        <Link to="/checkout">
          <button type="submit" className="cart__button">
            Checkout
          </button>
        </Link>
      )}
    </div>
  );
};

Cart.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Cart;
