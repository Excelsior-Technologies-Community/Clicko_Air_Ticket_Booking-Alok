import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompanyInfo, submitContactForm } from '../api/authApi';
import SplitText from '../Components/SplitText';
import '../Css/all.css';

const Contact = () => {
    const [companyInfo, setCompanyInfo] = useState({
        subtitle: 'Get In Touch',
        heading: 'Our Contact Information',
        address: '20 Cooper Square, New York, NY 10003',
        phone1: '+9 458 526 6589',
        phone2: '+3 458 526 6545',
        email1: 'info@example.com',
        email2: 'clicko@gmail.com'
    });

    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        phone: '',
        message: ''
    });

    const [status, setStatus] = useState({
        loading: false,
        success: null,
        message: ''
    });

    useEffect(() => {
        getCompanyInfo()
            .then(response => {
                if (response.data && response.data.success) {
                    setCompanyInfo(response.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching company details:", error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, subject, email, phone, message } = formData;
        if (!name || !subject || !email || !phone || !message) {
            setStatus({
                loading: false,
                success: false,
                message: 'Please fill all required fields.'
            });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setStatus({
                loading: false,
                success: false,
                message: 'Please enter a valid email address.'
            });
            return;
        }

        setStatus({ loading: true, success: null, message: '' });

        try {
            const response = await submitContactForm(formData);
            if (response.data && response.data.success) {
                setStatus({
                    loading: false,
                    success: true,
                    message: response.data.message || 'Your message has been submitted successfully!'
                });
                setFormData({
                    name: '',
                    subject: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                setStatus({
                    loading: false,
                    success: false,
                    message: response.data.message || 'Failed to submit message.'
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            const errMsg = error.response && error.response.data && error.response.data.message
                ? error.response.data.message
                : 'Failed to connect to server. Please check if your backend is running.';
            setStatus({
                loading: false,
                success: false,
                message: errMsg
            });
        }
    };

    const renderHeader = React.useMemo(() => (
        <div className="title-anime__split" style={{ perspective: '1000px' }}>
            <div className="split-line" style={{ display: 'block', position: 'relative' }}>
                <SplitText
                    text={companyInfo.subtitle}
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
                    text={companyInfo.heading}
                    className="tn-title__main contact-title"
                    tag="h2"
                    delay={35}
                    duration={0.85}
                    ease="power3.out"
                    splitType="chars"
                />
            </div>
        </div>
    ), [companyInfo.subtitle, companyInfo.heading]);

    const renderFormHeader = React.useMemo(() => (
        <div className="title-anime__split" style={{ perspective: '1000px' }}>
            <div className="split-line" style={{ display: 'block', position: 'relative' }}>
                <SplitText
                    text="Contact Us"
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
                    text="Feel Free To Write"
                    className="tn-title__main contact-title"
                    tag="h3"
                    style={{ fontSize: '36px', marginBottom: '0' }}
                    delay={35}
                    duration={0.85}
                    ease="power3.out"
                    splitType="chars"
                />
            </div>
        </div>
    ), []);

    return (
        <main className='Contact-Page'>
            <section className='banner-area'>
                <div className="container">
                    <div className='tn-breadcrumb__wrapper z-index-common text-center'>
                        <h2 className='text-white mb-15'>Contact Us</h2>
                        <nav>
                            <ol className="breadcrumb justify-content-center">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <div className="container space">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-40 title-anime animation-style3 text-center">
                            {renderHeader}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="info-card">
                            <div className="info-icon">
                                <i className="fa-solid fa-location-dot"></i>
                            </div>
                            <div className="info-content">
                                <h4>Our Address</h4>
                                <p>{companyInfo.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="info-card">
                            <div className="info-icon">
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="info-content">
                                <h4>Phone Number</h4>
                                <p>
                                    <a href={`tel:${companyInfo.phone1}`} className="info-link">{companyInfo.phone1}</a>
                                    <a href={`tel:${companyInfo.phone2}`} className="info-link">{companyInfo.phone2}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="info-card">
                            <div className="info-icon">
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="info-content">
                                <h4>Email Address</h4>
                                <p>
                                    <a href={`mailto:${companyInfo.email1}`} className="info-link">{companyInfo.email1}</a>
                                    <a href={`mailto:${companyInfo.email2}`} className="info-link">{companyInfo.email2}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-12">
                        <div className="contact-form-box">
                            <div className="mb-40 text-center">
                                {renderFormHeader}
                            </div>

                            {status.message && (
                                <div className={`alert ${status.success ? 'alert-success' : 'alert-danger'} mb-30`}>
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-md-6 col-12 text-start">
                                        <label htmlFor="name" className="form-label d-none">Your Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 col-12 text-start">
                                        <label htmlFor="subject" className="form-label d-none">Enter Subject</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            name="subject"
                                            placeholder="Enter Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 col-12 text-start">
                                        <label htmlFor="email" className="form-label d-none">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-6 col-12 text-start">
                                        <label htmlFor="phone" className="form-label d-none">Enter Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter Phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 text-start">
                                        <label htmlFor="message" className="form-label d-none">Your Message Here</label>
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            name="message"
                                            placeholder="Your Message Here"
                                            value={formData.message}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button
                                            type="submit"
                                            className="tn-btn tn-btn__red"
                                            disabled={status.loading}
                                        >
                                            {status.loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    <span>Sending...</span>
                                                </>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="map-part">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d136862.4393009356!2d-74.27638714902837!3d40.712265765344185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b7a93b3db47%3A0xfb446e31ef0e660!2sNitehawk%20Cinema!5e0!3m2!1sen!2sbd!4v1768918430960!5m2!1sen!2sbd" frameborder="0"></iframe>
            </div>
        </main>
    );
};

export default Contact;