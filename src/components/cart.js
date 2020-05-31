import React, { useContext } from 'react';
import CartItem from './cartItem';

import { GlobalContext } from '../context/Provider';

const Cart = () => {
  const { state } = useContext(GlobalContext);
  const { checkoutItems } = state;

  return (
    <div className="cart">
      {/* <CartItem
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
      /> */}
      {checkoutItems.map((item) => {
        return (
          <CartItem
            id={item.id}
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

export default Cart;
