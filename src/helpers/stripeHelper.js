
export const updateProduct = async (prod_id, product_info) => {
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