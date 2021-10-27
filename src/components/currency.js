import React, { useContext } from 'react';

import { GlobalContext } from '../context/Provider';
import './styles/currency.scss';

const Currency = () => {
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
      className="currency-select"
    >
      <option value="CAD">$ CAD</option>
      <option value="USD">$ USD</option>
    </select>
  );
};

export default Currency;
