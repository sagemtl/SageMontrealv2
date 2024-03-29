import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { GlobalContext } from '../context/Provider';
import './styles/currency.scss';

const Currency = ({ color }) => {
  const { state, dispatch } = useContext(GlobalContext);

  const handleChangeCurrency = (newCur) => {
    if (newCur === 'CAD') {
      dispatch({
        type: 'SET_CURRENCY_CAD',
      });
    } else if (newCur === 'USD') {
      dispatch({
        type: 'SET_CURRENCY_USD',
      });
    }
  };

  return (
    <select
      onChange={(e) => handleChangeCurrency(e.target.value)}
      value={state.currency}
      className={color === 'white' ? "currency-select currency-white" : "currency-select currency-black"}
    >
      <option value="CAD">$ CAD</option>
      <option value="USD">$ USD</option>
    </select>
  );
};

Currency.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Currency;
