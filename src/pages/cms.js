import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { render } from 'react-dom';
import { Checkbox, Form } from 'semantic-ui-react';
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

  const handleGetProduct = async () => {
    var prod = await getProductInfo(prod_id);
    var prod = JSON.parse(prod);
    console.log(prod);
    // setProd_id(prod.id);
    setActive(prod.active);
    setDesc(prod.description);
    setImages(prod.images);
    console.log(`infos: ${desc}`);
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

      <Form onSubmit={() => handleGetProduct()}>
        <Form.Input
          label="Description"
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
          value={desc || ''}
        />
        <Form.Field
          label="Active"
          control={Checkbox}
          onChange={(e) => setActive(e.target.value)}
          checked={active === 'true'}
        />
      </Form>
    </div>
  );
};

export default CMS;
