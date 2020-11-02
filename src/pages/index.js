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
      <Layout footerTransparent footerColor="black">
        <SEO title="Home" />
        <a href="https://www.artsteps.com/view/5f2757d621909b55d48be154">
          <video
            poster="https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-vid-poster.png"
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
            preload="auto"
          />
        </a>
      </Layout>
    );
  }

  return (
    <Layout footerTransparent footerColor="black">
      <>
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
              poster="https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-vid-poster.png"
              src="https://sageimagebank.s3.ca-central-1.amazonaws.com/sage-popup.mp4"
              style={{
                position: 'absolute',
                height: '50vh',
                width: 'auto',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              muted
              playsInline
              autoPlay
              loop
              preload="auto"
            />
          </a>
        </div>
      </>
    </Layout>
  );
};

export default IndexPage;
