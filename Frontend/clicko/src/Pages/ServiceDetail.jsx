import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServiceDetailSettings, getServiceDetailChecklist, getServiceDetailFaq } from '../api/authApi';

const ServiceDetail = () => {
    const [settings, setSettings] = useState({
        banner_title: "Service Details",
        main_heading: "Departure & Arrival Airports",
        main_description: "Looking For Flight Status Information For Flights In The USA...",
        list_heading: "Included Services",
        list_description: "Blinded By Desire, That They Cannot Foresee The Pain...",
        image1: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop",
        image2: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
        bottom_description: "Blinded By Desire, That They Cannot Foresee...",
        faq_heading: "FAQs: Your Questions Answered"
    });
    const [checklist, setChecklist] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFaqId, setActiveFaqId] = useState(null);

    useEffect(() => {
        const fetchServiceDetailData = async () => {
            try {
                const settingsRes = await getServiceDetailSettings();
                if (settingsRes.data && settingsRes.data.success) {
                    setSettings(settingsRes.data.data);
                }

                const checklistRes = await getServiceDetailChecklist();
                if (checklistRes.data && checklistRes.data.success) {
                    setChecklist(checklistRes.data.data);
                }

                const faqsRes = await getServiceDetailFaq();
                if (faqsRes.data && faqsRes.data.success) {
                    const data = faqsRes.data.data;
                    setFaqs(data);
                    if (data.length > 0) {
                        setActiveFaqId(data[0].id);
                    }
                }
            } catch (error) {
                console.error("Error fetching service detail page data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceDetailData();
    }, []);

    const toggleFaq = (id) => {
        setActiveFaqId(activeFaqId === id ? null : id);
    };

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
        <main className='ServiceDetail-Page'>
            <section className='banner-area'>
                <div className="container">
                    <div className='tn-breadcrumb__wrapper z-index-common text-center'>
                        <h2 className='text-white mb-15'>{settings.banner_title}</h2>
                        <nav>
                            <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Services Details</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>

            <section className="service-detail-section space z-index-common">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <img
                                src="https://clicko-html.vercel.app/assets/image/service/SDimg.jpg"
                                alt="Service Banner"
                                className="main-img-banner"
                            />
                            <h2 className="service-detail-heading">{settings.main_heading}</h2>
                            <p className="service-detail-para">{settings.main_description}</p>
                            <h3 className="Included-service-detail-heading">
                                {settings.list_heading}
                            </h3>
                            <p className="service-detail-para">
                                {settings.list_description}
                            </p>
                            {checklist.length > 0 && (
                                <div className="checklist-grid">
                                    {checklist.map((item) => (
                                        <div className="checklist-item" key={item.id}>
                                            <p>{item.item_text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="gallery-grid">
                                <img
                                    src={settings.image1 || "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop"}
                                    alt="Gallery 1"
                                    className="gallery-img"
                                />
                                <img
                                    src={settings.image2 || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop"}
                                    alt="Gallery 2"
                                    className="gallery-img"
                                />
                            </div>
                            <p className="service-detail-para">{settings.bottom_description}</p>
                            {faqs.length > 0 && (
                                <div className="faq-accordion-container">
                                    <h3 className="faq-accordion-title">{settings.faq_heading}</h3>
                                    <div className="accordion-list">
                                        {faqs.map((faq, index) => {
                                            const isOpen = activeFaqId === faq.id;
                                            const serialNumber = String(index + 1).padStart(2, '0');
                                            return (
                                                <div className="faq-item" key={faq.id}>
                                                    <div
                                                        className={`faq-header ${isOpen ? 'active' : 'inactive'}`}
                                                        onClick={() => toggleFaq(faq.id)}
                                                    >
                                                        <span className="faq-number">{serialNumber}</span>
                                                        <span className="faq-question">{faq.question}</span>
                                                        <div className="faq-icon-wrapper">
                                                            <i className={`fa-solid ${isOpen ? 'fa-chevron-down' : 'fa-chevron-up'}`}></i>
                                                        </div>
                                                    </div>
                                                    <div className={`faq-body ${isOpen ? 'open' : ''}`}>
                                                        <div className="faq-content">
                                                            {faq.answer}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-4">
                            <div className="serviceD-right">
                                <div className="Stitle d-flex justify-content-between align-items-center">
                                    <h2 className='text-white m-0'>All Services</h2>
                                    <i className='fa-solid fa-eject'></i>
                                </div>
                                <nav>
                                    <div className='allnav nav-tabs'>
                                        <div className="service-link">
                                            <span>
                                                Experience jet Private
                                            </span>
                                            <i className='fa-solid fa-arrow-right-long'></i>
                                        </div>
                                        <div className="service-link">
                                            <span>
                                                Upgrade check Airport
                                            </span>
                                            <i className='fa-solid fa-arrow-right-long'></i>
                                        </div>
                                        <div className="service-link">
                                            <span>
                                                Checked included
                                            </span>
                                            <i className='fa-solid fa-arrow-right-long'></i>
                                        </div>
                                        <div className="service-link">
                                            <span>
                                                ticket reissue policy
                                            </span>
                                            <i className='fa-solid fa-arrow-right-long'></i>
                                        </div>
                                        <div className="service-link">
                                            <span>
                                                ticket reissue Private
                                            </span>
                                            <i className='fa-solid fa-arrow-right-long'></i>
                                        </div>
                                    </div>
                                </nav>
                                <div className='support bg-title background-image'>
                                    <p>Get Support</p>
                                    <h2>get a free quick solution</h2>
                                    <button type="submit" class="tn-btn tn-btn__red">Contact Us</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ServiceDetail;