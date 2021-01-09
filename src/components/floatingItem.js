import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import ktvStudio from '../assets/ktv-studio.png';
import './styles/floatingItem.scss';

const FloatingItem = ({ speed, itemName, itemWidth, itemHeight, url }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(60);
  const [dimension, setDimension] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const velocityRef = useRef({ isMovingRight: true, isMovingDown: true });
  const rafRef = useRef({});
  const itemRef = useRef();

  useLayoutEffect(() => {
    const onResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (itemRef.current) {
      const { width, height } = itemRef.current.getBoundingClientRect();
      setDimension({ width, height });
      rafRef.current.isVisible = !document.hidden;
    }
  }, [windowSize]);

  const animate = useCallback(() => {
    if (dimension.width && dimension.height) {
      const setNewX = (prevPos) => {
        if (prevPos <= 0) velocityRef.current.isMovingRight = true;
        if (prevPos + dimension.width >= windowSize.width)
          velocityRef.current.isMovingRight = false;

        const velocity = velocityRef.current.isMovingRight ? speed : -speed;
        return prevPos + velocity;
      };

      const setNewY = (prevPos) => {
        if (prevPos <= 0) velocityRef.current.isMovingDown = true;
        if (prevPos + dimension.height >= windowSize.height)
          velocityRef.current.isMovingDown = false;

        const velocity = velocityRef.current.isMovingDown ? speed : -speed;
        return prevPos + velocity;
      };
      setX(setNewX);
      setY(setNewY);
    }
    rafRef.current.raf = requestAnimationFrame(animate);
  }, [
    dimension.height,
    dimension.width,
    speed,
    windowSize.height,
    windowSize.width,
  ]);

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [x, y]);

  const onVisibilityChange = useCallback(() => {
    rafRef.current.isVisible = !document.hidden;
    if (document.hidden) {
      cancelAnimationFrame(rafRef.current.raf);
    } else {
      rafRef.current.raf = requestAnimationFrame(animate);
    }
  }, [animate]);

  useLayoutEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange, false);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onVisibilityChange]);

  useEffect(() => {
    rafRef.current.raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current.raf);
    };
  }, [animate]);

  return (
    <div>
      <a href={url}>
        <img
          ref={itemRef}
          width={itemWidth}
          height={itemHeight}
          src={ktvStudio}
          className="floating-item"
          alt={itemName}
        />
      </a>
    </div>
  );
};

FloatingItem.propTypes = {
  speed: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

export default FloatingItem;
