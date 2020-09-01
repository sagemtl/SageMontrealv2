import React, { useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import './styles/index.scss';
import '../components/styles/layout.scss';

const IndexPage = () => {
  if (typeof window === `undefined`) {
    return <></>;
  }
  const mobile = window.innerWidth < 800;

  if (mobile) {
    return (
      <Layout footerTransparent footerColor="white">
        <SEO title="Home" />
        <a href="https://www.artsteps.com/view/5f2757d621909b55d48be154">
          <video
            src="https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-popup.mp4"
            style={{
              position: 'absolute',
              width: '100vw',
              height: 'auto',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            muted
            playsInline
            autoPlay
            loop
          />
        </a>
        <p
          style={{
            position: 'absolute',
            bottom: '5vh',
            width: '100vw',
            textAlign: 'center',
            fontWeight: 'bold',
            animation: 'updown 1.5s ease-in-out infinite',
          }}
        >
          Click or view the popup on desktop
        </p>
      </Layout>
    );
  }

  return (
    <Layout footerTransparent footerColor="white">
      <>
        <SEO title="Home" />
        <div className="artstep-wrapper">
          <div className="artstep-overlay">
            <h1 className="artstep-wrapper__header">
              <b>Sage Montreal</b>
            </h1>
          </div>
          <iframe
            title="Virtual Museum"
            width="100%"
            style={{ margin: 0 }}
            height="100%"
            src="https://www.artsteps.com/embed/5f2757d621909b55d48be154/560/315"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </>
    </Layout>
  );
};

export default IndexPage;
