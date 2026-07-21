import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBookingRoadmapSettings, getBookingRoadmapSteps } from '../api/authApi';
import SplitText from './SplitText';
import '../Css/all.css';

const BookingRoadmap = () => {
    const [settings, setSettings] = useState({
        subtitle: 'Booking Roadmap',
        heading: '4 Easy Steps Source Incredible Journey'
    });
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmapData = async () => {
            try {
                const settingsRes = await getBookingRoadmapSettings();
                if (settingsRes.data && settingsRes.data.success) {
                    setSettings(settingsRes.data.data);
                }
                const stepsRes = await getBookingRoadmapSteps();
                if (stepsRes.data && stepsRes.data.success) {
                    setSteps(stepsRes.data.data);
                }
            } catch (error) {
                console.error("Error fetching booking roadmap data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRoadmapData();
    }, []);

    const getStepIcon = (index) => {
        const icons = [
            "flaticon-tickets",
            "flaticon-flight-mode",
            "flaticon-world",
            "flaticon-credit-card"
        ];
        return icons[index % icons.length];
    };

    const renderHeading = (headingText) => {
        if (!headingText) return null;
        const match = headingText.match(/^(\d+\s+\w+\s+\w+|.*?\bSteps\b)(.*)$/i);
        if (match) {
            return (
                <>
                    <SplitText
                        text={match[1]}
                        className="d-block text-title"
                        tag="span"
                        delay={35}
                        duration={0.85}
                        ease="power3.out"
                        splitType="chars"
                    />
                    <SplitText
                        text={match[2]}
                        tag="span"
                        delay={35}
                        duration={0.85}
                        ease="power3.out"
                        splitType="chars"
                    />
                </>
            );
        }
        return (
            <SplitText
                text={headingText}
                tag="span"
                delay={35}
                duration={0.85}
                ease="power3.out"
                splitType="chars"
            />
        );
    };

    if (loading) {
        return null;
    }

    return (
        <section className="tn-process z-index-common" style={{ paddingBottom: '80px', paddingTop: '80px' }}>
            <div className="container">
                <div className="tn-process__bgImg">
                    <img src="https://clicko-html.vercel.app/assets/image/bg/roadMap-bg-h1.png" alt="RoadMap-bg" />
                </div>
                <div className="row">
                    <div className="col-lg-7 mx-auto">
                        <div className="tn-title title-anime animation-style3" style={{ marginBottom: '42px' }}>
                            <div className="title-anime__split text-center">
                                <SplitText
                                    text={settings.subtitle}
                                    className="tn-title__sub contact-subtitle text-center"
                                    tag="span"
                                    delay={35}
                                    duration={0.85}
                                    ease="power3.out"
                                    splitType="chars"
                                />
                                <h2 className="tn-title__main">
                                    {renderHeading(settings.heading)}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-0">
                    {steps.map((step, index) => (
                        <div className="col-lg-3 col-md-6 col-sm-6" key={step.id}>
                            <div className="tn-process__item">
                                <div className="tn-process__icon">
                                    <i className={getStepIcon(index)}></i>
                                </div>
                                <Link to="/booking">
                                    <h3>{step.title}</h3>
                                </Link>
                                <p>{step.description}</p>
                                <Link to="/booking" className="tn-process__arrow">
                                    <i className="fa-solid fa-angles-right"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BookingRoadmap;