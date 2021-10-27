import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Layout from '../components/layout';
import LookbookFront from '../components/lookbookFront';

import collectionSeven from '../assets/lookbooks/collection-7-tofu-house';

import './styles/lookbook.scss';

const LookbookMenu = () => {
  const collections = [
    {
      season: 'Fall 21',
      cover:
        collectionSeven.cover,
      images: collectionSeven.images,
    },
    {
      season: 'Spring 21',
      cover:
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614534769/Lookbooks/Spring_21/154390268_429997921618841_6920424006267164636_n_kccu4m.png',
      images: [
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217337/Lookbooks/Spring_21/1_yg5bm7.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217339/Lookbooks/Spring_21/2_eiun6p.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217339/Lookbooks/Spring_21/3_qlebmp.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217338/Lookbooks/Spring_21/4_coiwwi.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217340/Lookbooks/Spring_21/5_dkzqfh.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217340/Lookbooks/Spring_21/6_gdhfdr.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217341/Lookbooks/Spring_21/7_earwry.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217341/Lookbooks/Spring_21/8_hyawyg.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1614217341/Lookbooks/Spring_21/9_fjyexk.jpg',
      ],
    },
    {
      season: 'Summer 20',
      cover:
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1609534692/heat-of-the-sun-cover_jgr65g.png',
      images: [
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1609534697/heat-of-the-sun-lookbook_kohiq4.png',
      ],
    },
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
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596578719/SteamCoverV2_vrre0u.jpg',
      images: [
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384831/Steam/DSC_1725-min_tlum4v.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384830/Steam/DSC_1766-min_v1pid9.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384830/Steam/DSC_1886-min_gdoj6j.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384829/Steam/DSC_1588-min_ktzmce.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384832/Steam/DSC_1979-min_fhully.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384832/Steam/DSC_2006-min_o5orqr.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384831/Steam/DSC_1577-min_rrdx2k.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384831/Steam/DSC_1679-min_ov0j66.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384833/Steam/DSC_2131-min_m6bsw4.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384833/Steam/DSC_2136-min_vaf3ts.jpg',
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596384833/Steam/DSC_2155-min_e9xgnx.jpg',
      ],
      position: 'top left',
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
        'https://res.cloudinary.com/sagemontreal-com/image/upload/v1596578719/20666CoverV2_t2bp8h.jpg',
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
