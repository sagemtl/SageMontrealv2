// const stripe = require('stripe')("sk_test_steF95pSmUvXb9cdcfdwektV");

// export function updateProduct(prod_id, productContent) {
//     // var product_info = 

//     stripe.products.update(
//         prod_id,
//         {description:"newwwwww description laaaa"},
//         function(err, product) {
//         // asynchronously called
//             console.log("error: " + err);
//             console.log("returned product: " + product);
//             return product;
//         }
//     )
//     // .then(
//     //     function(result){
//     //         console.log("returned product: " + product);
//     //     },
//     //     function(err){
//     //         console.log("error: " + err);
//     //     }
//     // )
// }

export const getProductInfo = (prod_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sk_test_steF95pSmUvXb9cdcfdwektV");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://api.stripe.com/v1/products/"+prod_id, requestOptions)
    .then(response => response.text())
    .then(result => console.log("result:::: "+result))
    .catch(error => console.log('error', error));
}
