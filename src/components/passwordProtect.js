import React, { useState } from 'react';
import { setSessionPassword } from '../utils/utils';

const styles = {
  wrapper: {
    height: '90vh',
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    padding: '0 15px',
    textAlign: 'center',
  },
  wrapperInner: {
    width: '300px',
  },
  input: {
    width: '100%',
    height: '48px',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    height: '48px',
    background: '#154734',
    color: '#fff',
    border: '1px solid #000000',
    borderRadius: '4px',
    marginTop: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttonHover: {
    background: '#fff',
    color: '#000000',
  },
};

const PasswordProtect = () => {
  const [password, setPassword] = useState('');
  const [isButtonHovered, buttonHover] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSessionPassword(password);
    window.location.reload(); // eslint-disable-line
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={styles.wrapper}>
        <div style={styles.wrapperInner}>
          <h1 style={{ color: '#000000', marginTop: 0 }}>Sage Montreal</h1>
          <h5 style={{ color: '#000000', marginBottom: '25px' }}>
            Welcome to Sage office.
          </h5>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={styles.input}
            placeholder="Enter password"
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isButtonHovered ? styles.buttonHover : null),
            }}
            onMouseEnter={() => buttonHover(true)}
            onMouseLeave={() => buttonHover(false)}
          >
            Enter
          </button>
        </div>
      </div>
    </form>
  );
};

export default PasswordProtect;
