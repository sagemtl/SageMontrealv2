import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import './styles/index.scss';
import '../components/styles/layout.scss';
import FloatingItem from '../components/floatingItem';
import Loading from '../components/loading';
import videoPoster from '../assets/sage-vid-poster.png';
import videoPopup from '../assets/sage-popup.mp4';
import { GlobalContext } from '../context/Provider';

const IndexPage = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    return () => {
      if (!state.visitedPage.includes('/')) {
        dispatch({
          type: 'SET_VISITED_PAGE',
          payload: {
            visitedPage: state.visitedPage.push('/'),
          },
        });
      }
    };
  }, [dispatch, state.visitedPage]);

  useEffect(() => {
    setShowLoading(!state.visitedPage.includes('/'));
  }, [setShowLoading, state.visitedPage]);

  if (typeof window === `undefined`) {
    return <></>;
  }

  return (
    <Layout footerTransparent footerColor="black">
      <SEO title="Home" />
      <div className="home-wrapper">
        {showLoading && <Loading />}
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
      </div>
      <FloatingItem
        speed={1}
        itemName="Sage KTV"
        itemWidth={200}
        itemHeight={170}
        url="https://ktv.sagemontreal.com"
      />
    </Layout>
  );
};

export default IndexPage;
