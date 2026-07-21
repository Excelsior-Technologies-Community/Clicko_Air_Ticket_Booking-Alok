import React, { useState, useEffect } from 'react';
import { getFaqSettings, getFaqAccordion } from '../api/authApi';
import SplitText from './SplitText';

const FaqQuestion = () => {
    const [settings, setSettings] = useState({
        subtitle: 'Faq Questions',
        heading: 'Frequently Ask Questions Of Customer',
        description: "Our Goal Each Day Is To Ensure That Our Residents' Needs Are Not Only Met But Exceeded. To Make That Happen.",
        image: 'https://clicko-html.vercel.app/assets/image/about/faq-img.png'
    });

    const [accordionItems, setAccordionItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        Promise.all([getFaqSettings(), getFaqAccordion()])
            .then(([settingsRes, accordionRes]) => {
                if (settingsRes.data && settingsRes.data.success) {
                    setSettings(settingsRes.data.data);
                }
                if (accordionRes.data && accordionRes.data.success) {
                    setAccordionItems(accordionRes.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching FAQ data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading FAQ...</span>
                </div>
            </div>
        );
    }

    return (
        <section className="faq-section z-index-common space">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6" style={{ padding: '0' }}>
                        <div className="position-relative text-center mb-5 mb-lg-0 faq-img-wrapper">
                            <img
                                src={settings.image}
                                alt="FAQ Attendant"
                                className="img-fluid rounded-4 shadow faq-attendant-img"
                            />
                            <div className="faq-badge-circular">
                                <img src="https://clicko-html.vercel.app/assets/image/about/faq-img2-h1.png" alt="" />
                                <div className='roundtext'>
                                    <svg className="circleText" viewBox="0 0 500 500" data-duration="1">
                                        <path id="textcircle" strokeWidth="10" data-duration="1" d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250">
                                        </path>
                                        <text className="r-txt" dy="-35">
                                            <textPath href="#textcircle">Navigate to Every Crner of the Planet</textPath>
                                        </text>
                                    </svg>
                                    <i className="fa-solid fa-plane-up"></i>
                                </div>
                            </div>
                            <div className='faq__ele2'>
                                <img src="https://clicko-html.vercel.app/assets/image/about/faq-ele1-h1.png" alt="" style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)' }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6" style={{ padding: '0' }}>
                        <div className="faq-content-wrapper ps-lg-4">
                            <div className="title-anime__split" style={{ perspective: '1000px', marginBottom: '20px' }}>
                                <div className="split-line" style={{ display: 'block', position: 'relative' }}>
                                    <SplitText
                                        text={settings.subtitle}
                                        className="tn-title__sub contact-subtitle"
                                        tag="span"
                                        delay={35}
                                        duration={0.85}
                                        ease="power3.out"
                                        splitType="chars"
                                        style={{ marginBottom: '0' }}
                                    />
                                </div>
                                <div className="split-line" style={{ display: 'block', position: 'relative' }}>
                                    <SplitText
                                        text={settings.heading}
                                        className="contact-title text-left mb-3 faq-title"
                                        tag="h2"
                                        delay={35}
                                        duration={0.85}
                                        ease="power3.out"
                                        splitType="chars"
                                    />
                                </div>
                            </div>
                            <p className="pe-lg-5 mb-30 text-muted faq-desc">
                                {settings.description}
                            </p>
                            <div className="accordion faq-accordion-custom" id="faqAccordion">
                                {accordionItems.map((item, idx) => {
                                    const isExpanded = activeIndex === idx;
                                    return (
                                        <div className="accordion-item" key={item.id}>
                                            <h2 className="accordion-header" id={`heading${item.id}`}>
                                                <button
                                                    className={`accordion-button ${!isExpanded ? 'collapsed' : ''}`}
                                                    type="button"
                                                    onClick={() => setActiveIndex(isExpanded ? null : idx)}
                                                >
                                                    {item.question}
                                                </button>
                                            </h2>
                                            <div
                                                id={`collapse${item.id}`}
                                                className={`accordion-collapse collapse ${isExpanded ? 'show' : ''}`}
                                            >
                                                <div className="accordion-body">
                                                    {item.answer}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqQuestion;