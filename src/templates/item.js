import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const Item = ({data}) => {
  const item = data.stripeProduct
  console.log(data);
  return (

      <div>
        <h1>{item.name}</h1>
        <h2>{item.id}</h2>
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
  }
`