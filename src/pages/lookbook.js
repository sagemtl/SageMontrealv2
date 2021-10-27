import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Layout from '../components/layout';
import LookbookFront from '../components/lookbookFront';

import { collectionOne } from '../assets/lookbooks/collection-1-sage';
import { collectionTwo } from '../assets/lookbooks/collection-1-sage';
import { collectionThree } from '../assets/lookbooks/collection-3-transit';
import { collectionFour } from '../assets/lookbooks/collection-4-steam';
import { collectionFive } from '../assets/lookbooks/collection-5-heat-of-the-sun';
import { collectionSix } from '../assets/lookbooks/collection-6-sage-and-friends';
import { collectionSeven } from '../assets/lookbooks/collection-7-tofu-house';

import { capsuleOne } from '../assets/lookbooks/capsule-1-swish';

import './styles/lookbook.scss';

const LookbookMenu = () => {
  const collections = [
    {
      season: 'Fall 21',
      cover:
        collectionSeven.cover,
      images: collectionSeven.images,
      position: 'top left',
    },
    {
      season: 'Spring 21',
      cover: collectionSix.cover,
      images: collectionSix.images,
    },
    {
      season: 'Summer 20',
      cover: collectionFive.cover,
      images: collectionFive.images,
    },
    {
      season: 'Capsule 01',
      cover: capsuleOne.cover,
      images: capsuleOne.images,
      position: 'bottom right',
    },
    {
      season: 'Winter 20',
      cover: collectionFour.cover,
      images: collectionFour.images,
      position: 'top left',
    },
    {
      season: 'Summer 19',
      cover: collectionThree.cover,
      images: collectionThree.images,
    },
    {
      season: 'Winter 18',
      cover: collectionTwo.cover,
      images: collectionTwo.images,
    },
    {
      season: 'Spring 18',
      cover: collectionOne.cover,
      images: collectionOne.images,
      position: 'top right',
    },
  ];

  const scrollRight = () => {
    if (typeof window !== `undefined`) {
      window.scrollBy({
        left: -500,
        behavior: 'smooth',
      });
    }
  };

  const scrollLeft = () => {
    if (typeof window !== `undefined`) {
      window.scrollBy({
        left: 500,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Layout footerColor="white" style={{ alignItems: 'flex-start' }}>
      <div className="lookbook">
        <ArrowForwardIosIcon
          className="lookbook__icon--right"
          onClick={() => scrollLeft()}
        />
        {collections.map(({ season, images, cover, position }) => {
          return (
            <LookbookFront
              images={images}
              season={season}
              cover={cover}
              position={position}
              key={season}
            />
          );
        })}
      </div>
      <ArrowForwardIosIcon
        className="lookbook__icon--left"
        onClick={() => scrollRight()}
      />
    </Layout>
  );
};

export default LookbookMenu;
