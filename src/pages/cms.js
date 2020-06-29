import React, { useState } from 'react';
import { updateProduct, getProduct } from '../helpers/stripeHelper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import '../styles/cms.scss';
import { createJsxAttribute } from 'typescript';

const CMS = () => {
  // Product fields

  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [active, setActive] = useState(false);
  const [desc, setDesc] = useState('');
  // for the separated images url thingy, i was thinking we
  // could just take the whole string and break it into
  // separate urls once we send the request using split(',')
  const [images, setImages] = useState('');
  const [shippable, setShippable] = useState(false);
  const [featuredImg, setFeaturedImg] = useState('');
  // Lookbook fields
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [lookbookImages, setLookbookImages] = useState('');
  // allow editing of product info
  const [edit, setEdit] = useState(false); 
  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackSeverity, setSnackSeverity] = useState('info');
  const [snackMessage, setSnackMessage] = useState('');

  const setSnack =(open, sev, msg)=>{
    setSnackbarOpen(open);
    setSnackSeverity(sev);
    setSnackMessage(msg);
  }

  const handleGetProduct = async (e) => {
    // e.preventDefault();
    var prod = await getProduct(productId);
    if(prod.statusCode){
      if(prod.statusCode==404){
        setSnack(true, 'error', 'The product does not exist');
        return;
      }
      setSnack(true, 'error', 'There has been an error getting the product');
      return;
    }
    setActive(prod.active);
    setDesc(prod.description);
    setImages(prod.images.join(',')); //turn array into comma seperated array
    setName(prod.name);
    prod.metadata.featuredImg? setFeaturedImg(prod.metadata.featuredImg) : null;
  };

  const handleUpdateProduct = async()=>{
    //handle images
    setImages(images.trim());
    setImages(images.replace(/\s/g, ''));
    var imgArr = images.split(',');
    var count = (images.match(/http/g) || []).length;
    if(count != imgArr.length){
      setSnack(true, 'error', "URLs are incorrect in format, must be seperated by commas");
      return;
    }

    var newProduct = new Object;
    newProduct.active = active;
    newProduct.description = desc;
    newProduct.name = name;
    newProduct.images = imgArr;
    newProduct.metadata = {featuredImg:featuredImg};
    var prod = await updateProduct(productId, newProduct);
    prod.statusCode? setSnack(true, 'error', "There has been an error updating the product")
                     : setSnack(true, 'success', "Product is successfully updated");
  }
  
  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <div className="cms">
      <div className="cms-product">
        <h1>Product</h1>
        <div className="cms__field">
          <p className="cms__label">Product ID</p>
          <input
            placeholder="Product ID"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            className="cms__input"
          />
          <button
            onClick={(e) => handleGetProduct(e)}
            type="button"
            className="cms__button"
          >
            Get Product
          </button>
          <br/>
          <button
            onClick={() => setEdit(true)}
            type="button"
            className="cms__button"
          >
            Edit
          </button>
        </div>

        <div className="cms__field">
          <p className="cms__label">Name</p>
          <div>
            <input
              placeholder="Name of item"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              disabled={!edit}
              className="cms__input"
            />
          </div>
        </div>

        <div className="cms__field">
          <p className="cms__label">Description</p>
          <div>
            <textarea
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={4}
              disabled={!edit}
              className="cms__input-area"
            />
          </div>
        </div>

        <div className="cms__field">
          <p className="cms__label">Active</p>
          <div>
            <input
              placeholder="true/false"
              type="checkbox"
              checked={active}
              onChange={()=>{setActive(!active)}}
              disabled={!edit}
              className="cms__input"
            />
          </div>
        </div>

        <div className="cms__field">
          <p className="cms__label">Images URL</p>
          <div>
            <textarea
              placeholder="Comma seperated URLs"
              onChange={(e) => setImages(e.target.value)}
              value={images}
              rows={4}
              disabled={!edit}
              className="cms__input-area"
            />
          </div>
        </div>

        <div className="cms__field">
          <p className="cms__label">Featured Image URL</p>
          <div>
            <input
              placeholder="Image to be displayed on shop page"
              onChange={(e) => setFeaturedImg(e.target.value)}
              value={featuredImg}
              disabled={!edit}
              className="cms__input"
            />
          </div>
        </div>

        <button type="button" className="cms__button" onClick={()=>handleUpdateProduct()}>
          Update Product
        </button>
      </div>

      <div className="cms-lookbook">
        <h1>Lookbook</h1>
        <div className="cms__field">
          <p className="cms__label">Lookbook title</p>
          <div>
            <input
              placeholder="Product ID"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="cms__input"
            />
          </div>
        </div>

        <div className="cms__field">
          <p className="cms__label">Cover URL</p>
          <div>
            <input
              placeholder="URL of cover picture"
              onChange={(e) => setCoverUrl(e.target.value)}
              value={coverUrl}
              className="cms__input"
            />
          </div>
        </div>

        <div className="cms__field">
          <p className="cms__label">Images URL</p>
          <div>
            <input
              placeholder="Comma seperated URLs"
              onChange={(e) => setLookbookImages(e.target.value)}
              value={lookbookImages}
              className="cms__input"
            />
          </div>
        </div>

        <button type="button" className="cms__button">
          Add lookbook
        </button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={()=>setSnackbarOpen(false)}
        >
        <Alert severity={snackSeverity}>
          {snackMessage}
        </Alert>
      </Snackbar>

    </div>
  );
};

export default CMS;
