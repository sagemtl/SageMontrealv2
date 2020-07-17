import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/layout';
import LookbookFront from '../components/lookbookFront';

import '../styles/lookbook.scss';

const LookbookMenu = ({ uri }) => {
  const collections = [
    {
      label: 'Swish',
      season: 'Capsule 01',
      images: [
        'https://res.cloudinary.com/sage-montreal/image/upload/v1583035301/lookbookSwish/swish_lookbook_u1laoy.jpg',
      ],
    },
    {
      label: 'Steam',
      season: 'Winter 20',
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
    },
    {
      label: 'Transit',
      season: 'Summer 19',
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
      label: '仙人集团',
      season: 'Spring 18',
      images: [
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/DSC_0593_dqqatl.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/Untitled-2_jb5y2r.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/DSC_0811_waybex.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/DSC_0791_decats.jpg',
        'https://res.cloudinary.com/sage-montreal/image/upload/v1580350739/lookbookFirst/DSC_0820_bwi8bi.jpg',
      ],
    },
    {
      label: '20666',
      season: 'Winter 18',
      images: [
        'https://res.cloudinary.com/sage-montreal/image/upload/v1556419772/lookbook_mvygkt.jpg',
      ],
      position: 'bottom',
    },
  ];

  return (
    <Layout current={uri}>
      <div className="lookbook">
        <div className="lookbook-scroll">
          {collections.map(({ label, season, images, position }) => {
            return (
              <LookbookFront
                images={images}
                label={label}
                season={season}
                position={position}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

LookbookMenu.propTypes = {
  uri: PropTypes.string.isRequired,
};

export default LookbookMenu;
