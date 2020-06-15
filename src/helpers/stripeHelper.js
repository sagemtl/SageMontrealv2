export const getProductInfo = async (prod_id) => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer sk_test_steF95pSmUvXb9cdcfdwektV');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(`https://api.stripe.com/v1/products/${prod_id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => console.log('error', error));
};

export const updateProduct = async (product) => {};
