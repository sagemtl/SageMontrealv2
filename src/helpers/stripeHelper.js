// not fully tested yet
export const sortSizes = (skus) => {
  const ordering = {}; // map for efficient lookup of sortIndex
  const sortOrder = ['XS', 'S', 'M', 'L', 'XL', 'Onesize'];
  for (let i = 0; i < sortOrder.length; i++) ordering[sortOrder[i]] = i;
  skus.sort(function (a, b) {
    return ordering[a.node.attributes.name] - ordering[b.node.attributes.name];
  });

  return skus;
};

export const updateProduct = async (prod_id, product_info) => {
  console.log(product_info);
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
    `${process.env.GATSBY_BACKEND_URL}/inventory-api/product/${prod_id}`,
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
    `${process.env.GATSBY_BACKEND_URL}/inventory-api/product/${prod_id}`,
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
  console.log(`${process.env.GATSBY_BACKEND_URL}/inventory-api/create/product`);
  return fetch(
    `${process.env.GATSBY_BACKEND_URL}/inventory-api/create/product`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const updateSkuInventory = async (item, color, size, quantity) => {
  const qtyObj = new Object();
  qtyObj.quantity = quantity;
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(qtyObj),
  };
  return fetch(
    `${process.env.GATSBY_BACKEND_URL}/inventory-api/inventory/${item}-${color}-${size}`,
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
  return fetch(
    `${process.env.GATSBY_BACKEND_URL}/inventory-api/inventory/${item}-${color}-${size}`,
    requestOptions,
  )
    .then((response) => response.json())
    .then((result) => {
      // result.sku_id = skuId;
      return { quantity: result.quantity, sku_id: skuId };
    })
    .catch((error) => console.log('error', error));
};
