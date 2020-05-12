import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Image from '../components/image';

const Shop = () => (
  <Layout>
    <SEO title="Shop" />
    <h1>Shop</h1>
    <Image/>
    <Link to="/">Home</Link>
  </Layout>
);

export default Shop;