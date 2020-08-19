import React, { useState } from 'react';
import { updateProduct, getProduct, createProduct } from '../helpers/stripeHelper';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import CreateModal from '../components/createModal'

import './styles/cms.scss';
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
  const [modelInfo, setModelInfo] = useState('');
  // Lookbook fields
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [lookbookImages, setLookbookImages] = useState('');
  // allow editing of product info
  const [edit, setEdit] = useState(false);
  // snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState('info'); // one of 'info', 'error', 'success', 'warning'
  const [snackMessage, setSnackMessage] = useState('');
  // create a product
  const [createMode, setCreateMode] = useState(false);
  const [nameCreate, setNameCreate] = useState('');
  const [imagesCreate, setImagesCreate] = useState('');
  const [descCreate, setDescCreate] = useState('');

  const setSnack =(open, sev, msg)=>{
    setSnackbarOpen(open);
    setSnackSeverity(sev);
    setSnackMessage(msg);
  };

  const clearCreateFields = () => {
    setNameCreate('');
    setDescCreate('');
    setImagesCreate('');
  }

  const processImgArr = (images) => {
    //handle images
    var imgArr = images.split(',');
    imgArr = imgArr.map(s => s.trim())
    var count = (images.match(/http/g) || []).length;
    if (count == 0) {
      setSnack(true, 'error', "Must have at least 1 url in Images URL");
      return null;
    } else if(count != imgArr.length){
      setSnack(true, 'error', "URLs are incorrect in format, must be seperated by commas");
      return null;
    }
    return imgArr;
  }

  const handleGetProduct = async (id = productId) => {
    id = id.trim();
    setProductId(id);
    var prod = await getProduct(id);
    if(prod==undefined){
      setSnack(true, 'error', 'There has been an error getting the product');
      return;
    }
    else if(prod.statusCode){
      if(prod.statusCode==404){
        setSnack(true, 'error', 'The product does not exist');
        return;
      }
      setSnack(true, 'error', 'There has been an error getting the product');
      return;
    }
    setActive(prod.active);
    setDesc(prod.description);
    setImages(prod.images.join(',')); // turn array into comma seperated string
    setName(prod.name);
    prod.metadata.featuredImg
      ? setFeaturedImg(prod.metadata.featuredImg)
      : null;
    prod.metadata.modelInfo ? setFeaturedImg(prod.metadata.modelInfo) : null;
  };

  const handleUpdateProduct = async()=>{
    //handle images
    var imgArr = processImgArr(images);
    if (!imgArr) return;

    const newProduct = new Object();
    newProduct.active = active;
    newProduct.description = desc;
    newProduct.name = name;
    newProduct.images = imgArr;
    newProduct.metadata = {
      featuredImg,
      modelInfo,
    };
    var prod = await updateProduct(productId, newProduct);
    prod.statusCode? setSnack(true, 'error', "There has been an error updating the product")
                     : setSnack(true, 'success', "Product is successfully updated");
  }

  const handleCreateProduct = async() => {
    var imgArr = processImgArr(imagesCreate);
    if (!imgArr) return;

    var newProduct = new Object;
    newProduct.description = descCreate;
    newProduct.name = nameCreate;
    newProduct.images = imgArr;

    var prod = await createProduct(newProduct);
    prod.statusCode? setSnack(true, 'error', `Code ${prod.statusCode}, there has been an error creating the product`)
                    : setSnack(true, 'success', "Product is successfully created");
    clearCreateFields();
    if(prod.id){
      setProductId(prod.id);
      setCreateMode(false);
      handleGetProduct(prod.id);
    }
  }
  
  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <div className="cms">
      <div className="cms-product">
        <h1>Product</h1>
        <button
            onClick={() => setCreateMode(true)}
            type="button"
            className="cms__button"
          >
            Create
        </button>
        <CreateModal
          createMode={createMode}
          setCreateMode={setCreateMode}
          nameCreate={nameCreate}
          setNameCreate={setNameCreate}
          descCreate={descCreate}
          setDescCreate={setDescCreate}
          imagesCreate={imagesCreate}
          setImagesCreate={setImagesCreate}
          handleCreateProduct={handleCreateProduct}
        />
        <div className="cms__field">
          <p className="cms__label">Product ID</p>
          <input
            placeholder="Product ID"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            className="cms__input"
          />
          <button
            onClick={(e) => handleGetProduct()}
            type="button"
            className="cms__button"
          >
            Get Product
          </button>
          <br />
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
          <p className="cms__label">Model Info</p>
          <div>
            <input
              placeholder="Model is height xxx wearing size xxx"
              onChange={(e) => setModelInfo(e.target.value)}
              value={modelInfo}
              disabled={!edit}
              className="cms__input"
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
              onChange={() => {
                setActive(!active);
              }}
              disabled={!edit}
              className="cms__checkbox"
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

        <button
          type="button"
          className="cms__button"
          onClick={() => handleUpdateProduct()}
        >
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
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackSeverity}>{snackMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default CMS;
