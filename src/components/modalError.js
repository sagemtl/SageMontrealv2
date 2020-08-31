import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';

const ModalError = ({ modalShow, setModalShow, message}) => {

//   const handleClose = () => {
//       show = false
//   }

  return (
    <>
        <Modal show={modalShow} onHide={() => setModalShow(false)} centered={true}>
        <Modal.Header closeButton>
          <img src="https://res.cloudinary.com/sagemontreal-com/image/upload/v1596573724/404Octopus_rezqoj.png" width="100" className="error-image"/>
        </Modal.Header>
        <Modal.Body style={{textAlign: "center"}}>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalShow(false)} style={{marginLeft: "auto", marginRight: "auto", display: "block"}}>
            Try Again
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalError;