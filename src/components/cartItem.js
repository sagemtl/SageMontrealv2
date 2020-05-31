import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { GlobalContext } from '../context/Provider';

const CartItem = ({ name, amount, size, price, image, id }) => {
  const { state, dispatch } = useContext(GlobalContext);

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

  return (
    <div
      className="cart__item"
      onClick={() => navigate(`/shop/${name.replace(/ +/g, '-')}`)}
    >
      <div className="cart__item__amount">
        <b>{amount}x</b>
      </div>
      <img className="cart__item__image" height="50" src={image} alt="test" />
      <div className="cart__item__size">
        <b>{size}</b>
      </div>
      <div className="cart__item__price">
        <b>${price}</b>
      </div>
      <ClearRoundedIcon
        fontSize="small"
        className="cart__item__close"
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
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CartItem;
