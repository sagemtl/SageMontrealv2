import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import './styles/index.scss';
import '../components/styles/layout.scss';
import FloatingItem from '../components/floatingItem';
import videoPoster from '../assets/sage-vid-poster.png';
import videoPopup from '../assets/sage-popup.mp4';

const IndexPage = () => {
  if (typeof window === `undefined`) {
    return <></>;
  }

  return (
    <Layout footerTransparent footerColor="black">
      <SEO title="Home" />
      <div className="artstep-wrapper">
        <div className="artstep-overlay">
          <h1 className="artstep-wrapper__header">
            <b>Sage Montreal</b>
          </h1>
        </div>
        <a
          href="https://www.artsteps.com/view/5f2757d621909b55d48be154"
          rel="noopener noreferrer"
          target="_blank"
        >
          <video
            poster={videoPoster}
            src={videoPopup}
            className="video-homepage"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
          />
        </a>
      </div>
      <FloatingItem
        speed={0.05}
        itemName="Sage KTV"
        itemWidth={200}
        itemHeight={170}
      />
    </Layout>
  );
};

export default IndexPage;
