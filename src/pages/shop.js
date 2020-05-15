import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from '../components/image';

const Shop = ({data}) => {
 console.log(data);

return (
  <Layout>
    <SEO title="Shop" />
    <h1>Shop</h1>
    <h2>SKUs</h2>
    {data.allStripeSku.edges.map(({ node })=>(
      <div>
        <img src={node.image}/>
        <p>{node.attributes.name}</p>
      </div>
    ))}
    <h2>Products</h2>
    {data.allStripeProduct.edges.map(({ node })=>(
      <div>
        <p>{node.name}</p>
      </div>
    ))}
    <h2> MONGODB products </h2>
    {data.allMongodbHeroku8Pxd36BkProducts.edges.map(({ node })=>(
      <div>
        <img src={node.imagePath}/>
      </div>
    ))}

    
    <Link to="/">Home</Link>
  </Layout>
);
}

export default Shop;

export const query = graphql`
query MyQuery {
  allStripeProduct {
    edges {
      node {
        id
        name
        object
      }
    }
  }
  allStripeSku {
    edges {
      node {
        id
        attributes {
          name
        }
        product {
          id
        }
        image
      }
    }
  }
  allMongodbHeroku8Pxd36BkProducts {
    edges {
      node {
        imagePath
      }
    }
  }
}
`