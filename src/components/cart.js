import React from 'react';
import CartItem from './cartItem';

const Cart = () => {
  return (
    <div className="cart">
      <CartItem
        amount="1"
        price="59"
        size="L"
        image="https://files.stripe.com/links/fl_test_3970bNWJvc6btCo5qp2yiizZ"
      />
      <CartItem
        amount="1"
        price="35"
        size="L"
        image="https://files.stripe.com/links/fl_test_3970bNWJvc6btCo5qp2yiizZ"
      />
      <CartItem
        amount="1"
        price="59"
        size="M"
        image="https://files.stripe.com/links/fl_test_3970bNWJvc6btCo5qp2yiizZ"
      />
      <button type="submit" onClick="" className="cart__button">
        Checkout
      </button>
    </div>
  );
};

export default Cart;
