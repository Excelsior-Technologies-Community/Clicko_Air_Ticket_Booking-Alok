import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Preloader from './Preloader';

const TransitionContext = createContext(null);

export const useTransitionContext = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransitionContext must be used within a PageTransitionProvider');
  }
  return context;
};

export const PageTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const preloaderRef = useRef(null);
  const activeTimeline = useRef(null);

  const startTransition = (to) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (activeTimeline.current) {
      activeTimeline.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        navigate(to);
      }
    });

    activeTimeline.current = tl;
    tl.to(preloaderRef.current, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.4,
      ease: 'power2.out'
    });
    tl.to({}, { duration: 0.6 });
  };
  useEffect(() => {
    if (activeTimeline.current) {
      activeTimeline.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    activeTimeline.current = tl;
    tl.to({}, { duration: 0.15 });
    tl.to(preloaderRef.current, {
      opacity: 0,
      visibility: 'hidden',
      duration: 0.4,
      ease: 'power2.inOut'
    });
  }, [location.pathname]);

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      <div style={{ pointerEvents: isTransitioning ? 'none' : 'auto' }}>
        {children}
      </div>
      <Preloader containerRef={preloaderRef} />
    </TransitionContext.Provider>
  );
};
