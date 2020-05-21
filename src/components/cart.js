import React from 'react';
import CartItem from './cartItem';

const Cart = () => {
  return (
    <div className="cart">
      <CartItem />
      <CartItem />
      <CartItem />
      <button type="submit" onClick="" className="cart__button">
        Checkout
      </button>
    </div>
  );
};

export default Cart;
