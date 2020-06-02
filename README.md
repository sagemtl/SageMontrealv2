# Quickstart
For development
```shell
gatsby develop
```

For production
```shell
gatsby build
```

## Notes
* Need ".env.development" and ".env.production" files for credentials
* When getting "...directly does not exist" errors, do ```gatsby clean```

##GraphQL
###stripeProduct
Localized images:
* Image in "featuredImg" is displayed in Shop page, taken from stripeProduct.metadata["featuredImg"]
* Images in the array of Children elements are displayed in product pages, taken from stripeProduct.images

###stripeSku
Localized images:
* Image in "featuredImg" is displayed in product page, taken from stripeSku.image
