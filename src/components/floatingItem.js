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

const FloatingItem = ({ speed, itemName, itemWidth, itemHeight }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(60);
  const [dimension, setDimension] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const previousTimeRef = useRef();
  const velocityRef = useRef({ isMovingRight: true, isMovingDown: true });
  const rafRef = useRef();
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
    }
  }, [windowSize]);

  const animate = useCallback(
    (time) => {
      if (previousTimeRef.current && dimension.width && dimension.height) {
        const setNewX = (prevPos) => {
          if (prevPos <= 0) velocityRef.current.isMovingRight = true;
          if (prevPos + dimension.width >= windowSize.width)
            velocityRef.current.isMovingRight = false;

          const velocity = velocityRef.current.isMovingRight ? speed : -speed;
          return prevPos + (time - previousTimeRef.current) * velocity;
        };

        const setNewY = (prevPos) => {
          if (prevPos <= 0) velocityRef.current.isMovingDown = true;
          if (prevPos + dimension.height >= windowSize.height)
            velocityRef.current.isMovingDown = false;

          const velocity = velocityRef.current.isMovingDown ? speed : -speed;
          return prevPos + (time - previousTimeRef.current) * velocity;
        };
        setX(setNewX);
        setY(setNewY);
      }
      previousTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    },
    [
      dimension.height,
      dimension.width,
      speed,
      windowSize.height,
      windowSize.width,
    ],
  );

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [x, y]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div>
      <img
        ref={itemRef}
        width={itemWidth}
        height={itemHeight}
        src={ktvStudio}
        className="floating-item"
        alt={itemName}
      />
    </div>
  );
};

FloatingItem.propTypes = {
  speed: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  itemWidth: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
};

export default FloatingItem;
