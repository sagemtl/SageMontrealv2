import React, { useState } from 'react';
import { getProductInfo } from '../helpers/stripeHelper';

import '../styles/cms.scss';

const CMS = () => {
  // Product fields

  const [productId, setProductId] = useState('');
  const [active, setActive] = useState(false);
  const [desc, setDesc] = useState('');
  // for the separated images url thingy, i was thinking we
  // could just take the whole string and break it into
  // separate urls once we send the request using split(',')
  const [images, setImages] = useState('');
  const [shippable, setShippable] = useState(false);
  const [type, setType] = useState('');

  // Lookbook fields

  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [lookbookImages, setLookbookImages] = useState('');

  // allow editing of product info
  const [edit, setEdit] = useState(false);

  const handleGetProduct = async (e) => {
    e.preventDefault();
    var prod = await getProductInfo(productId);
    var prod = JSON.parse(prod);
    console.log(prod);
    setActive(prod.active);
    setDesc(prod.description);
    setImages(prod.images);
    console.log(`infos: ${desc}`);
    console.log(images);
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
            onClick={() => handleGetProduct()}
            type="button"
            className="cms__button"
          >
            Get Product
          </button>
        </div>

        <div className="cms__field">
          <p className="cms__label">Description</p>
          <div>
            <textarea
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              rows={4}
              className="cms__input-area"
            />
          </div>
        </div>

        <div className="cms__field">
          <p className="cms__label">True/False?</p>
          <div>
            <input
              placeholder="true/false"
              onChange={(e) => {
                setActive(e.target.value === 'true');
              }}
              value={active}
              className="cms__input"
            />
          </div>
        </div>

        <div className="cms__field">
          <p className="cms__label">Images URL</p>
          <div>
            <input
              placeholder="Comma seperated URLs"
              onChange={(e) => setImages(e.target.value)}
              value={images}
              className="cms__input"
            />
          </div>
        </div>

        <button type="button" className="cms__button">
          Add Product
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
    </div>
  );
};

export default CMS;
