/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import PropTypes from 'prop-types';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Layout from '../components/layout';
import SizeChart from '../components/sizeChart';
import { GlobalContext } from '../context/Provider';
import { sortSizes, getSkuInventory } from '../helpers/stripeHelper';

import './styles/product.scss';

const Product = ({ data }) => {
  const item = data.stripeProduct;
  const skus = data.allStripeSku;

  const getFeaturedImgInChild = () => {
    const coverPhoto = item.children.find(
      (node) => node.id === item.featuredImg.id,
    );
    if(coverPhoto==undefined) return item.children[0].childImageSharp.fixed.src;
    return coverPhoto.childImageSharp.fixed.src;
  };

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSku, setSelectedSku] = useState('');
  const [selectedImage, setSelectedImage] = useState(getFeaturedImgInChild);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [inventories, setInventories] = useState([]);
  const { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const getAllInventory = async () => {
      const invs = await Promise.all(
        skus.edges.map(async ({ node }) => {
          // the name of the sku is the size
          const inv = await getSkuInventory(
            item.metadata.item,
            item.metadata.colour,
            node.attributes.name,
            node.id,
          );
          return inv;
        }),
      );
      if (invs) {
        setInventories(invs);
      }
    };

    getAllInventory();
  }, [item.metadata.colour, item.metadata.item, skus.edges]);

  const checkIsInStock = (skuId) => {
    const inv = inventories.filter(
      (invEl) => typeof invEl !== 'undefined' && invEl.sku_id === skuId,
    );
    if (inv[0] && inv[0].quantity <= 0) {
      return false;
    }
    return true;
  };

  const allowAddToCart = () => {
    if (selectedSize.length <= 0) return false;
    if (!checkIsInStock(selectedSku)) return false;
    return true;
  };

  const filterPrice = (sku) => {
    const matched = skus.edges.find(({ node }) => node.id === sku);
    return matched.node.price / 100;
  };

  const addToCart = () => {
    const itemsCopy = Array.from(state.checkoutItems);
    const itemId = item.id + selectedSize;
    const itemIndex = itemsCopy.findIndex((i) => i.id === itemId);

    if (itemIndex !== -1) {
      itemsCopy[itemIndex].amount += 1;
    } else {
      itemsCopy.push({
        id: itemId,
        name: item.name,
        amount: 1,
        price: filterPrice(selectedSku),
        size: selectedSize,
        image: item.featuredImg.childImageSharp.fixed,
        skuId: selectedSku,
        prodMetadata: item.metadata,
      });

      if (window.datadogLogs) {
        window.datadogLogs.logger.info('Added to Cart', {
          id: itemId,
          name: item.name,
          amount: 1,
          price: filterPrice(selectedSku),
          size: selectedSize,
          skuId: selectedSku,
          prodMetadata: item.metadata,
        });
      }
    }
    dispatch({
      type: 'SET_CHECKOUT_ITEMS',
      payload: {
        checkoutItems: itemsCopy,
      },
    });
  };

  // not fully tested yet
  const sortedSkus = sortSizes(skus.edges);

  const imgIcons = () => {
    const icons = item.children.map((node, ind) => {
      return (
        <img
          src={node.childImageSharp.fixed.src}
          alt={node.name}
          className="product-images__image--secondary"
          onClick={() => setSelectedImage(node.childImageSharp.fixed.src)}
          onKeyDown={() => setSelectedImage(node.childImageSharp.fixed.src)}
          key={ind.toString()}
        />
      );
    });
    return icons;
  };

  const renderSizesFromSku = () => {
    const skuComponents = sortedSkus.map(({ node }) => {
      const size = node.attributes.name;
      const nodeid = node.id;
      const hasStock = checkIsInStock(nodeid);
      const className = `product-details-sizes-label__${
        hasStock ? 'in-stock' : 'no-stock'
      }`;
      return (
        <div className="product-details-sizes__size" key={size}>
          <input
            type="radio"
            id={size}
            value={size}
            checked={selectedSize === size}
            onChange={() => {
              setSelectedSku(nodeid);
              setSelectedSize(size);
            }}
            disabled={false || !hasStock}
          />
          <label htmlFor={size} className={className}>
            {size}
          </label>
        </div>
      );
    });
    return skuComponents;
  };

  const productDescription = (desc) => {
    const descArr = desc.split(',');
    const descComponent = descArr.map((text) => {
      const finalText = text.trim();
      return (
        <p className="product-details__point" key={text}>
          {finalText}
        </p>
      );
    });
    return descComponent;
  };

  return (
    <Layout>
      <div className="product">
        <div className="product-images">
          <img
            src={selectedImage}
            alt={item.name}
            className="product-images__image--main"
            onClick={() => {
              setZoomOpen(true);
            }}
            onKeyDown={() => {
              setZoomOpen(true);
            }}
          />
          <div className="product-images-secondary">
            <div className="product-scroll">{imgIcons()}</div>
          </div>
        </div>
        <div className="product-details">
          <h1 className="product-details__header">{item.name}</h1>
          {productDescription(item.description)}
          {item.metadata.modelInfo ? (
            <p className="product-details__point">{item.metadata.modelInfo}</p>
          ) : null}
          {(item.metadata.item=="hoodie")?
            (<b className="product-details__point" key="backorder-disclaimer">
              * This product is currently in backorder, item will ship in 2-3 weeks.
            </b>) : null
           }
          <br />
          <p className="product-details__price">
            $ {skus.edges[0].node.price / 100} CAD
          </p>
          {/* sku/size selection */}
          <div className="product-details-sizes">{renderSizesFromSku()}</div>
          {/* size guide */}
          <button
            type="button"
            className="size-guide__size-guide-link"
            onClick={() => setModalOpen(true)}
          >
            size guide
          </button>
          <SizeChart modalOpen={modalOpen} setModalOpen={setModalOpen} />

          <button
            className="product-details__button"
            type="button"
            onClick={addToCart}
            disabled={!allowAddToCart()}
          >
            Add to cart
          </button>
        </div>
        <Link className="product-details__back" to="/shop/all">
          <KeyboardBackspaceIcon className="product-back" fontSize="large" />
        </Link>
        <Modal
          open={zoomOpen}
          onClose={() => setZoomOpen(false)}
          aria-labelledby="zoom"
          aria-describedby="Product Zoom"
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <img
            src={selectedImage}
            alt={item.name}
            style={{
              left: '50%',
              top: '50%',
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
};

Product.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Product;

export const query = graphql`
  query($id: String!) {
    stripeProduct(id: { eq: $id }) {
      id
      name
      description
      fields {
        slug
      }
      metadata {
        modelInfo
        item
        colour
      }
      featuredImg {
        id
        childImageSharp {
          fixed(height: 50, toFormat: PNG) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      children {
        ... on File {
          name
          id
          childImageSharp {
            fixed(height: 750, toFormat: PNG) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    allStripeSku(filter: { product: { id: { eq: $id } } }) {
      edges {
        node {
          id
          price
          attributes {
            name
          }
        }
      }
    }
  }
`;
