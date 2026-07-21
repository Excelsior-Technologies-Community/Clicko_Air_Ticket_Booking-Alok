import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServicesSettings, getServicesList } from '../api/authApi';
import SplitText from '../Components/SplitText';
import BestDeal from '../Components/BestDeal';
import BookingRoadmap from '../Components/BookingRoadmap';
import '../Css/all.css';

const Service = () => {
    const [settings, setSettings] = useState({
        subtitle: 'Why Choose Us',
        heading: 'Experience Browse By Topic & Service',
        description: 'Frequently Asked Questions Just One Click Away.',
        more_service_btn_text: 'More Service',
        bottom_subtitle: 'Get Your Air Ticket Booking',
        bottom_heading: "Don't Waste A Second! Call Us Solve Your Any Problem",
        bottom_btn_text: 'Find Solution'
    });
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const settingsRes = await getServicesSettings();
                if (settingsRes.data && settingsRes.data.success) {
                    setSettings(settingsRes.data.data);
                }

                const listRes = await getServicesList();
                if (listRes.data && listRes.data.success) {
                    setServices(listRes.data.data);
                }
            } catch (error) {
                console.error("Error fetching service data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceData();
    }, []);

    const getServiceIcon = (index) => {
        const icons = [
            "flaticon-airplane-2",
            "flaticon-secure-document",
            "flaticon-luggage-1",
            "flaticon-ticket",
            "flaticon-global",
            "flaticon-seat"
        ];
        return icons[index % icons.length];
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
        <main className='Service-page'>
            <section className='banner-area'>
                <div className="container">
                    <div className='tn-breadcrumb__wrapper z-index-common text-center'>
                        <h2 className='text-white mb-15'>Service Page</h2>
                        <nav>
                            <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Services Page</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <section className="services-section space z-index-common">
                <div className="container">
                    <div className="row g-4 align-items-stretch">
                        <div className="col-lg-6 col-md-12">
                            <div className="services-info-panel h-100 d-flex flex-column justify-content-center">
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
                                        />
                                    </div>
                                    <div className="split-line" style={{ display: 'block', position: 'relative' }}>
                                        <SplitText
                                            text={settings.heading}
                                            className="tn-title__main text-left fw-bold"
                                            style={{ marginBottom: '0' }}
                                            tag="h1"
                                            delay={35}
                                            duration={0.85}
                                            ease="power3.out"
                                            splitType="chars"
                                        />
                                    </div>
                                </div>
                                <p className="mb-4">
                                    {settings.description}
                                </p>
                                <div>
                                    <button className="tn-btn tn-btn__red">
                                        {settings.more_service_btn_text}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {services.slice(0, 2).map((service, index) => (
                            <div className="col-lg-3 col-md-6 col-sm-12" key={service.id}>
                                <div className="card service-card">
                                    <div className="d-flex justify-content-between align-items-center mb-25">
                                        <div className="service-card-icon-wrapper rounded-circle text-white">
                                            <i className={`${getServiceIcon(index)} service-card-icon`}></i>
                                        </div>
                                        <span className="service-card-number">
                                            {service.service_number}
                                        </span>
                                    </div>
                                    <h4 className="service-card-title">{service.title}</h4>
                                    <p className="mb-0 service-card-desc">{service.description}</p>
                                </div>
                            </div>
                        ))}
                        {services.slice(2, 4).map((service, index) => (
                            <div className="col-lg-3 col-md-6 col-sm-12" key={service.id}>
                                <div className="card service-card">
                                    <div className="d-flex justify-content-between align-items-center mb-25">
                                        <div className="service-card-icon-wrapper rounded-circle text-white">
                                            <i className={`${getServiceIcon(index + 2)} service-card-icon`}></i>
                                        </div>
                                        <span className="service-card-number">
                                            {service.service_number}
                                        </span>
                                    </div>
                                    <h4 className="service-card-title">{service.title}</h4>
                                    <p className="mb-0 service-card-desc">{service.description}</p>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-6 col-md-12">
                            <div className="card service-cta-card">
                                <span className="service-cta-subtitle">
                                    {settings.bottom_subtitle}
                                </span>
                                <h2 className="service-cta-heading">
                                    {settings.bottom_heading}
                                </h2>
                                <div>
                                    <button className="tn-btn tn-btn__red" style={{ marginBottom: '20px', marginTop: '20px' }}>
                                        {settings.bottom_btn_text}
                                    </button>
                                </div>
                                <img
                                    src="https://clicko-html.vercel.app/assets/image/icons/plane-red.png"
                                    alt=""
                                    className="service-cta-bg-icon"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <BestDeal />
            <BookingRoadmap />
        </main>
    );
};

export default Service;