import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const Item = ({data}) => {
  const item = data.stripeProduct
  const skus = data.allStripeSku
  console.log(data);
  return (

      <div>
        <h1>{item.name}</h1>
        <h2>Product ID: {item.id}</h2>
        <h3>Associated SKUs</h3>
        {skus.edges.map(({ node })=>(
          <div>
            <img src={node.image}/>
            <p>{node.attributes.name}</p>
          </div>
        ))}
      </div>

  )
}

export default Item

export const query = graphql`
  query($id: String!) {
    stripeProduct(id: {eq: $id}) {
        id
        name
      }
    allStripeSku(filter: {product: {id: {eq: $id}}}) {
      edges {
        node {
          image
          attributes {
            name
          }
        }
      }
    }
  }
`