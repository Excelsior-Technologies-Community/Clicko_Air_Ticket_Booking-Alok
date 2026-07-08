import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAboutInfo } from '../api/authApi';
import SplitText from '../Components/SplitText';
import BestDeal from '../Components/BestDeal';
import '../Css/all.css';

const About = () => {
    const [aboutData, setAboutData] = useState({
        subtitle: 'Know About Flight',
        heading: 'Experience The Luxury Private Jet',
        description: "Choosing the right private jet is essential for a comfortable, efficient that and travel experience. Whether you're flying for business.",
        feature_title: 'Easy & Quick Booking',
        feature_desc: 'right private jet is essential for a comfortable, efficient that and travel experience.',
        checklist1: 'Private Jet Is Essential For A Comfortable',
        checklist2: 'Essential For A Comfortable',
        image1: 'https://clicko-html.vercel.app/assets/image/about/about-img-h2.jpg',
        image2: 'https://clicko-html.vercel.app/assets/image/about/about-img2-h2.jpg'
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAboutInfo()
            .then(response => {
                if (response.data && response.data.success) {
                    setAboutData(response.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching about info:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <main>
            <section className='banner-area'>
                <div className="container">
                    <div className='tn-breadcrumb__wrapper z-index-common text-center'>
                        <h2 className='text-white mb-15'>About Us</h2>
                        <nav>
                            <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">About Us</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="about-section space z-index-common">
                <div className="tn-faq__ele">
                    <img src="https://clicko-html.vercel.app/assets/image/hero/hero-ele-h1.png" className='tn-xx-anim' alt="" />
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="tn-about2__media mb-30">
                                <img src={aboutData.image1} alt="Crew members" loading="lazy" />
                                <img src={aboutData.image2} alt="Smiling traveler" loading="lazy" className="about-img2" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="tn-about2--content">
                                <div className="title-anime__split" style={{ perspective: '1000px', marginBottom: '20px' }}>
                                    <div className="split-line" style={{ display: 'block', position: 'relative' }}>
                                        <SplitText
                                            text={aboutData.subtitle}
                                            className="tn-title__sub contact-subtitle"
                                            tag="span"
                                            delay={35}
                                            duration={0.85}
                                            ease="power3.out"
                                            splitType="chars"
                                        />
                                    </div>
                                    <div className="split-line" style={{ display: 'block', position: 'relative' }}>
                                        <SplitText
                                            text={aboutData.heading}
                                            className="tn-title__main contact-title text-left"
                                            style={{ marginBottom: '0' }}
                                            tag="h2"
                                            delay={35}
                                            duration={0.85}
                                            ease="power3.out"
                                            splitType="chars"
                                        />
                                    </div>
                                </div>
                                <p className="about-desc pe-xl-4 mb-30">
                                    {aboutData.description}
                                </p>

                                <div className="feature-item d-flex align-items-center mb-30">
                                    <div className="feature-icon-wrapper">
                                        <div className="tn-about2__icon">
                                            <i className="flaticon-airplane-3"></i>
                                        </div>
                                    </div>
                                    <div className="feature-content">
                                        <h3>{aboutData.feature_title}</h3>
                                        <p>{aboutData.feature_desc}</p>
                                    </div>
                                </div>

                                <ul className="about-checklist mb-30">
                                    <li>
                                        <img src="https://clicko-html.vercel.app/assets/image/icons/check-icon.png" alt="" />
                                        <span>{aboutData.checklist1}</span>
                                    </li>
                                    <li>
                                        <img src="https://clicko-html.vercel.app/assets/image/icons/check-icon.png" alt="" />
                                        <span>{aboutData.checklist2}</span>
                                    </li>
                                </ul>
                                <div className='d-flex align-items-center'>
                                    <button type="submit" class="tn-btn">Discover More</button>
                                    <div className="about-phone-icon">
                                        <i className='flaticon-phone'></i>
                                        <h4>
                                            <span>Call us free</span>
                                            +1 568 562 889
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BestDeal />
        </main>
    );
};

export default About;
