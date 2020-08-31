import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Img from 'gatsby-image';
import { GlobalContext } from '../context/Provider';
import { useLocation } from '@reach/router';


const CartItem = ({ name, amount, size, price, image, id, sku, isCheckout}) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { pathname } = useLocation();

  const removeItem = (e) => {
    e.stopPropagation();
    const itemsCopy = Array.from(state.checkoutItems);
    itemsCopy.splice(
      itemsCopy.findIndex((item) => {
        return item.id === id;
      }),
      1,
    );

    dispatch({
      type: 'SET_CHECKOUT_ITEMS',
      payload: {
        checkoutItems: itemsCopy,
      },
    });
  };

  const handleClick = () => {
    navigate(`/shop/${name.replace(/ +/g, '-')}`);
  };

  return (
    <div
      className={isCheckout ? "cart_checkout__item" : "cart__item"}
      onClick={() => handleClick()}
      onKeyDown={() => handleClick()}
      role="button"
      tabIndex={0}
    >
      <div className={isCheckout ? "cart_checkout__item__amount" : "cart__item__amount"}>
        <b>{amount}x</b>
      </div>
      <div className="image-wrapper">
        <Img
          className={isCheckout ? "cart_checkout__item__image" : "cart__item__image"}
          height="50"
          fixed={image}
          alt="cart item"
        />
      </div>
      <div className={isCheckout ? "cart_checkout__item__size" : "cart__item__size"}>
        <b>{size}</b>
      </div>
      <div className={isCheckout ? "cart_checkout__item__price" : "cart__item__price"}>
        <b>${price}</b>
      </div>
      {pathname === '/checkout' && <div className="cart_checkout__item__name">
        <b>{name}</b>
      </div>}
      <ClearRoundedIcon
        fontSize="small"
        className={isCheckout ? "cart_checkout__item__close" : "cart__item__close"}
        onClick={removeItem}
      />
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.shape.isRequired,
  id: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
};

export default CartItem;
