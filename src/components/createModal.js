import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CreateModal = (props) => {
    const {createMode, setCreateMode, nameCreate, setNameCreate, descCreate, setDescCreate, imagesCreate, setImagesCreate, handleCreateProduct} = props;


    return (

        <Dialog open={createMode} onClose={()=>setCreateMode(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create</DialogTitle>
        <DialogContent>
          <div className="cms__field">
            <p className="cms__label">Name</p>
            <div>
              <input
                placeholder="Name of item"
                onChange={(e) => {
                  setNameCreate(e.target.value);
                }}
                value={nameCreate}
                className="cms__input"
              />
            </div>
          </div>

          <div className="cms__field">
            <p className="cms__label">Description</p>
            <div>
              <textarea
                placeholder="Description"
                onChange={(e) => setDescCreate(e.target.value)}
                value={descCreate}
                rows={4}
                className="cms__input-area"
              />
            </div>
          </div>

          <div className="cms__field">
          <p className="cms__label">Images URL</p>
          <div>
            <textarea
              placeholder="Comma seperated URLs"
              onChange={(e) => setImagesCreate(e.target.value)}
              value={imagesCreate}
              rows={4}
              className="cms__input-area"
            />
          </div>
        </div>
        </DialogContent>
        <DialogActions>
          <button color="primary" onClick={()=>handleCreateProduct()}>
            Save
          </button>
        </DialogActions>
      </Dialog>
    );
};

export default CreateModal