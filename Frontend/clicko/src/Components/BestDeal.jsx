import React, { useState, useEffect } from 'react';
import { getBestDeal } from '../api/authApi';
import SplitText from './SplitText';
import '../Css/bestdeal.css';

const AnimatedCounter = ({ target, duration = 1500 }) => {
    const [displayValue, setDisplayValue] = useState('');
    const elementRef = React.useRef(null);

    useEffect(() => {
        if (!target) return;

        const match = target.toString().match(/^(\d+)(.*)$/);
        if (!match) {
            setDisplayValue(target);
            return;
        }

        const targetNum = parseInt(match[1], 10);
        const suffix = match[2];

        let animationFrameId = null;

        const startAnimation = () => {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentNum = Math.floor(progress * targetNum);

                let formattedNum = currentNum;
                let finalSuffix = suffix;
                if (targetNum >= 1000 && !suffix) {
                    formattedNum = Math.floor(currentNum / 1000);
                    finalSuffix = 'K+';
                }

                setDisplayValue(`${formattedNum}${finalSuffix}`);
                if (progress < 1) {
                    animationFrameId = window.requestAnimationFrame(step);
                } else {
                    if (targetNum >= 1000 && !suffix) {
                        setDisplayValue(`${Math.floor(targetNum / 1000)}K+`);
                    } else {
                        setDisplayValue(`${targetNum}${suffix}`);
                    }
                }
            };
            animationFrameId = window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (animationFrameId) {
                        window.cancelAnimationFrame(animationFrameId);
                    }
                    startAnimation();
                } else {
                    let initialVal = 0;
                    let finalSuffix = suffix;
                    if (targetNum >= 1000 && !suffix) {
                        finalSuffix = 'K+';
                    }
                    setDisplayValue(`${initialVal}${finalSuffix}`);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (animationFrameId) {
                window.cancelAnimationFrame(animationFrameId);
            }
            observer.disconnect();
        };
    }, [target, duration]);

    return <span ref={elementRef}>{displayValue}</span>;
};

const BestDeal = () => {
    const [dealData, setDealData] = useState({
        subtitle: 'Best Deals Offer',
        heading: 'Experience The Luxury Private Jet',
        metric1_val: '35K+',
        metric1_lbl: 'Happy Customers',
        metric2_val: '100%',
        metric2_lbl: 'Client Satisfied',
        video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    });
    const [showVideoModal, setShowVideoModal] = useState(false);

    useEffect(() => {
        getBestDeal()
            .then(response => {
                if (response.data && response.data.success) {
                    setDealData(response.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching best deal details:", error);
            });
    }, []);


    return (
        <section className="best-deal-section space z-index-common">
            <div className="container">
                <div className='row p-0 justify-content-between align-items-center'>
                    <div className="col-lg-7">
                        <div className="best-deal-left me-xl-5 pe-xl-5 z-index-common">
                            <SplitText
                                text={dealData.subtitle}
                                className="best-deal-subtitle text-left"
                                style={{ color: '#ffffff' }}
                                tag="span"
                                delay={35}
                                duration={0.85}
                                ease="power3.out"
                                splitType="chars"
                            />
                            <SplitText
                                text={dealData.heading}
                                className="best-deal-heading text-left"
                                tag="h2"
                                delay={35}
                                duration={0.85}
                                ease="power3.out"
                                splitType="chars"
                            />
                        </div>
                        <div className="best-deal-metrics me-xxl-5">
                            <div className="metric-card">
                                <div className="metric-info">
                                    <h3>
                                        <AnimatedCounter target={dealData.metric1_val} />
                                    </h3>
                                    <p>{dealData.metric1_lbl}</p>
                                </div>
                                <div className="metric-icon">
                                    <i className="flaticon-customer-review"></i>
                                </div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-info">
                                    <h3>
                                        <AnimatedCounter target={dealData.metric2_val && !dealData.metric2_val.toString().endsWith('%') ? `${dealData.metric2_val}%` : dealData.metric2_val} />
                                    </h3>
                                    <p>{dealData.metric2_lbl}</p>
                                </div>
                                <div className="metric-icon">
                                    <i className="flaticon-global"></i>
                                </div>
                            </div>
                        </div>
                        <div className="cTxt">
                            <p>Choosing the right private jet is essential</p>
                            <button type="submit" class="tn-btn tn-btn__red cTxtbtn" style={{ textTransform: 'uppercase', padding: '8px 30px' }}>Contact Us</button>
                        </div>
                    </div>
                    <div className="col-auto me-lg-5">
                        <p className="watch-video-label">
                            <img src="https://clicko-html.vercel.app/assets/image/icons/arrow-h2.png" alt="" />
                            WATCH VIDEO
                        </p>
                        <a className="watch-video-container" onClick={() => setShowVideoModal(true)}>
                            <i className="fa-solid fa-play"></i>
                        </a>
                    </div>
                </div>
                <div className="tn-video__rightImg">
                    <img src="https://clicko-html.vercel.app/assets/image/bg/video-img-h2.jpg" alt="" />
                    <div className="tn-video__shape"></div>
                </div>
            </div>
            {showVideoModal && (
                <div className="video-modal-overlay" onClick={() => setShowVideoModal(false)}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="video-modal-close" onClick={() => setShowVideoModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className="video-responsive">
                            <iframe
                                title="Watch Video"
                                src={dealData.video_url}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default BestDeal;