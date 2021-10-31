import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { navigate } from 'gatsby';

const ModalError = ({ modalShow, setModalShow, message }) => {
  const handleClose = () => {
    setModalShow(false);
    if (message === 'Some items in your cart are sold out.') {
      navigate('/shop');
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <img
            src="https://res.cloudinary.com/die52atcc/image/upload/v1613361014/output-onlinepngtools_lshu3u.png"
            width="100"
            className="error-image"
            alt="Error"
          />
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => handleClose()}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
            }}
          >
            Try Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalError;
