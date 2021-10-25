import axios from 'axios';

// not fully tested yet
export const sortSizes = (skus) => {
  const ordering = {}; // map for efficient lookup of sortIndex
  const sortOrder = ['XS', 'S', 'M', 'L', 'XL', 'OS'];
  for (let i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
  skus.sort(function (a, b) {
    return ordering[a.node.attributes.name] - ordering[b.node.attributes.name];
  });

  return skus;
};

export const updateProduct = async (prod_id, product_info) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(product_info),
  };
  return fetch(
    `${process.env.GATSBY_BACKEND_URL}/products/stripe/${prod_id}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const getProduct = async (prod_id) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(
    `${process.env.GATSBY_BACKEND_URL}/products/stripe/${prod_id}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const createProduct = async (product_info) => {
  product_info.type = 'good';
  product_info.attributes = ['name'];
  product_info.active = false;
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(product_info),
  };
  return fetch(
    `${process.env.GATSBY_BACKEND_URL}/products/stripe/create`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const getSkuInventory = async (item, color, size, skuId) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    redirect: 'follow',
  };
  const res = await axios.get(
    `${process.env.GATSBY_BACKEND_URL}/products/inventory/${skuId}`,
  );

  return { quantity: res.data.inventory, sku_id: skuId };
};

export const convertCadToUsd = (cadPrice) => {
  const conversion = {
    89: 79,
    59: 49,
    44: 39,
    34: 29,
    29: 24,
    24: 19,
  };
  return conversion[cadPrice];
};
