import React, { useState } from 'react';
import { Checkbox, Form, TextArea, Select } from 'semantic-ui-react';
import { getProductInfo } from '../helpers/stripeHelper';
import Layout from '../components/layout';

const CMS = () => {
  const [prod_id, setProd_id] = useState('');
  const [active, setActive] = useState(false);
  const [desc, setDesc] = useState('');
  const [images, setImages] = useState([]);
  const [shippable, setShippable] = useState(false);
  const [type, setType] = useState('');

  // allow editing of product info
  const [edit, setEdit] = useState(false);

  const handleGetProduct = async (e) => {
    e.preventDefault();
    var prod = await getProductInfo(prod_id);
    var prod = JSON.parse(prod);
    console.log(prod);
    // setProd_id(prod.id);
    setActive(prod.active);
    setDesc(prod.description);
    setImages(prod.images);
    console.log(`infos: ${desc}`);
    console.log(images);
  };

  return (
    <div>
      <Form onSubmit={() => handleGetProduct()}>
        <Form.Input
          label="Product ID"
          placeholder="Product ID"
          onChange={(e) => setProd_id(e.target.value)}
          value={prod_id || ''}
        />

        <button type="submit">Get Product</button>
      </Form>

      <Form >
        <Form.Group>
        <Form.Field
          label="Description"
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc || ''}
        />

        <Form.Field
          label="Active"
          placeholder="true/false"
          onChange={(e) => {
            e.target.value == "true"? setActive(true) : setActive(false)
          }}
          value={active || ''}
        />

        <Form.Field
          control={TextArea}
          label="Images URL"
          placeholder="comma seperated URLs"
          onChange={(e) => setImages(e.target.value)}
          value={images.toString() || ''}
        />
        
        {/* {images? (images.map((url)=>{
            <img src={url} alt="product images"/>
          })) : null} */}
          </Form.Group>
        </Form>
    </div>
  );
};

export default CMS;
