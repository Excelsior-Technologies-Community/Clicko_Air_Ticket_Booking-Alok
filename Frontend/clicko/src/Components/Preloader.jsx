import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Preloader.css';

gsap.registerPlugin();

const Preloader = ({ containerRef }) => {
  const airplaneRef = useRef(null);

  useGSAP(() => {
    gsap.to(airplaneRef.current, {
      rotation: 360,
      duration: 2,
      ease: "none",
      repeat: -1
    });

  }, { scope: containerRef });

  const renderCloudySpans = () => {
    const totalSpans = 20;
    const spans = [];
    for (let i = 1; i <= totalSpans; i++) {
      spans.push(
        <span
          key={i}
          style={{ '--i': i }}
        />
      );
    }
    return spans;
  };

  return (
    <div ref={containerRef} className="preloader-overlay" aria-hidden="true">
      <img src="https://clicko-html.vercel.app/assets/image/logoH2.svg" alt="Clicko Logo" />
      <div className="radar-loader-container">
        {renderCloudySpans()}
        <div className="airplane-container">
          <i className='flaticon-airplane-5 icon'></i>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
