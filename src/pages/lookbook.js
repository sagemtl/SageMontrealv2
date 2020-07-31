import React from 'react';
import PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Layout from '../components/layout';
import LookbookFront from '../components/lookbookFront';

import '../styles/lookbook.scss';

const LookbookMenu = ({ uri }) => {
  const collections = [
    {
      season: 'Capsule 01',
      cover:
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596165459/SwishCover_b444ou.jpg',
      images: [
        'https://res.cloudinary.com/sage-montreal/image/upload/v1583035301/lookbookSwish/swish_lookbook_u1laoy.jpg',
      ],
      position: 'bottom right',
    },
    {
      season: 'Winter 20',
      cover:
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596165459/SteamCover_aye3a5.jpg',
      images: [
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/1_gjlmik.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/2_pk948p.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/3_g45sch.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/4_hphb4t.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/5_aptyse.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/6_hy2piq.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583185/lookbookSteam/7_n2tkl9.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/8_smacic.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/9_esocvv.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1579583184/lookbookSteam/10_iezm3p.jpg',
      ],
      position: 'bottom left',
    },
    {
      season: 'Summer 19',
      cover:
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596165459/TransitCover_jhivn1.jpg',
      images: [
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337613/lookbook-desktop/1_i5socf.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337443/lookbook-desktop/2_eayxmf.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337443/lookbook-desktop/3_kl0zea.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337443/lookbook-desktop/4_vpaedq.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337444/lookbook-desktop/5_d9t2jm.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337444/lookbook-desktop/6_ijjucl.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337444/lookbook-desktop/7_udmk7x.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337445/lookbook-desktop/8_cc6pze.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337444/lookbook-desktop/9_h5owzi.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337445/lookbook-desktop/10_dps5iq.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337444/lookbook-desktop/11_a2zpzr.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337444/lookbook-desktop/12_vmjoxv.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337445/lookbook-desktop/13_mng7mw.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337445/lookbook-desktop/14_nqgraf.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337445/lookbook-desktop/15_zgarnk.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561337445/lookbook-desktop/16_iqv3bj.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1561338416/lookbook-desktop/17_kxmjkh.jpg',
      ],
    },
    {
      season: 'Winter 18',
      cover:
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596165459/20666Cover_kdvsxh.jpg',
      images: [
        'https://res.cloudinary.com/sage-montreal/image/upload/v1556419772/lookbook_mvygkt.jpg',
      ],
    },
    {
      season: 'Spring 18',
      cover:
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596165459/SageCover_h78pkc.jpg',
      images: [
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/DSC_0593_dqqatl.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/Untitled-2_jb5y2r.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/DSC_0811_waybex.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/DSC_0791_decats.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/DSC_0820_bwi8bi.jpg',
      ],
    },
  ];

  const scrollRight = () => {
    window.scrollBy({
      left: -600,
      behavior: 'smooth',
    });
  };

  const scrollLeft = () => {
    window.scrollBy({
      left: 600,
      behavior: 'smooth',
    });
  };

  return (
    <Layout current={uri} footerColor="white">
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
            />
          );
        })}
        <ArrowForwardIosIcon
          className="lookbook__icon--left"
          onClick={() => scrollRight()}
        />
      </div>
    </Layout>
  );
};

LookbookMenu.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default LookbookMenu;
