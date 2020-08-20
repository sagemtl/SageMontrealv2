// not fully tested yet
export const sortSizes = (skus) => {
  var ordering = {}, // map for efficient lookup of sortIndex
    sortOrder = ['XS','S','M', 'L', "XL", "Onesize"];
  for (var i=0; i<sortOrder.length; i++)
      ordering[sortOrder[i]] = i;
  skus.sort( function(a, b) {
      return (ordering[a.node.attributes.name] - ordering[b.node.attributes.name]);
  });

  return skus; 
}

export const updateProduct = async (prod_id, product_info) => {
  console.log(product_info);
  const requestOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(product_info)
  };
  return fetch(`http://localhost:5000/product/${prod_id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const getProduct = async (prod_id) => {
  const requestOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(`http://localhost:5000/product/${prod_id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const createProduct = async (product_info) => {
  product_info["type"] = "good";
  product_info["attributes"] = ["name"];
  product_info["active"] = false;
  const requestOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(product_info)
  };
  return fetch(`http://localhost:5000/create/product`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const updateSkuInventory = async (sku_id, quantity) => {
  var quantity = new Object;
  quantity.quantity = quantity;
  const requestOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    redirect: 'follow',
    body: JSON.stringify(quantity)
  };
  return fetch(`http://localhost:5000/inventory/${sku_id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const getSkuInventory = async (sku_id) => {
  const requestOptions = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
    redirect: 'follow',
  };
  return fetch(`http://localhost:5000/inventory/${sku_id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.log('error', error));
};


