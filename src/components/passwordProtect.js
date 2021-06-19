import React, { useState } from 'react';
import sageAnimated from '../assets/sage-animated.gif';
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
    marginTop: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttonHover: {
    background: '#fff',
    color: '#000000',
  },
  sageAnimated: {
    padding: '10px',
    width: '150px',
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
          <video
            src="https://res.cloudinary.com/sagemontreal-com/video/upload/v1596165122/Logo_vyryy9.mp4"
            poster={sageAnimated}
            style={styles.sageAnimated}
            muted
            playsInline
            loop
          />
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
