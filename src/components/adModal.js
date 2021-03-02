import React, { useState, useEffect, useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import cigaretteCase from '../assets/cigarette_white.gif';
import { GlobalContext } from '../context/Provider';

import './styles/adModal.scss';

const Transition = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="down" ref={ref} {...props} />
));

const AdModal = () => {
  const { state } = useContext(GlobalContext);
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    return () => {
      if (!state.visitedPage.includes('/shop')) {
        state.visitedPage.push('/shop');
      }
    };
  }, [state.visitedPage]);

  useEffect(() => {
    if (!state.visitedPage.includes('/shop')) {
      setModal(true);
    }
  }, [state.visitedPage]);

  return (
    <div className="ad-modal-dialog">
      <Dialog
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        onClose={closeModal}
        maxWidth="xs"
        style={{ overflow: 'hidden' }}
        classes={{
          paper: 'ad-modal',
        }}
        transitionDuration={{ enter: 2000, exit: 1000 }}
        fullWidth
        onClick={closeModal}
      >
        <video
          src="https://res.cloudinary.com/sagemontreal-com/video/upload/v1614535841/cigarette_case_xdoram.mp4"
          poster={cigaretteCase}
          className="cigarette-case"
          muted
          playsInline
          loop
        />
      </Dialog>
    </div>
  );
};

export default AdModal;
