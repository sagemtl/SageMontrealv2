
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


export const getProductInfo = async (prod_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sk_test_steF95pSmUvXb9cdcfdwektV");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    return fetch("https://api.stripe.com/v1/products/"+prod_id, requestOptions)
    .then(response => response.text())
    .then(result => { 
        debugger;
        return result;
    })
    .catch(error => console.log('error', error));
}

export const updateProduct = async (product) =>{
    
}

export const generateSlug = (name) => {
    //global replacement of space
    var slug = name.replace(/ /g, "-");
    return slug;
}
