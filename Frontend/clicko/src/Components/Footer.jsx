import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/footer.css'

const Footer = () => {
    return (
        <section className='Footer-section overflow-hidden'>
            <div className="footer-backg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="footer-widget">
                                <div className="footer-logo mb-20">
                                    <Link>
                                        <img src="https://clicko-html.vercel.app/assets/image/logo2.svg" alt="" />
                                    </Link>
                                </div>
                                <p className='pe-lg-5'>There are many variations of passag Lorem available, but the majority.</p>
                                <div className="footer-call_support">
                                    <i className='flaticon-phone-call'></i>
                                    <span>
                                        call support
                                        <a href="">+1344 688 955</a>
                                    </span>
                                </div>
                                <div className="social-style--footer">
                                    <span>follow us :</span>
                                    <a href="">
                                        <i className='fab fa-facebook-f'></i>
                                    </a>
                                    <a href="">
                                        <i className='fab fa-linkedin-in'></i>
                                    </a>
                                    <a href="">
                                        <i className='fab fa-youtube'></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 ps-lg-0">
                            <div className="footer-widget mt-15">
                                <h2 className='use-link'>
                                    Useful Links
                                </h2>
                                <ul className='footer-menu'>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Company Profile
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Help Center
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/contact">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Contact us
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Social Marketing
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Blog
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="footer-widget mt-15">
                                <h2 className='use-link'>
                                    Our Services
                                </h2>
                                <ul className='footer-menu'>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Application Assistance
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Ticket Guidance
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Documentation Support
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            Social Marketing
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className='fa-solid fa-angles-right'></i>
                                            License
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 ps-lg-0">
                            <div className="footer-widget mb-15">
                                <h2 className='use-link'>Instagram</h2>
                                <div className="footer-gallery">
                                    <div className="gallery-thumb">
                                        <a href="">
                                            <img src="https://clicko-html.vercel.app/assets/image/footer/insta1.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="gallery-thumb">
                                        <a href="">
                                            <img src="https://clicko-html.vercel.app/assets/image/footer/insta2.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="gallery-thumb">
                                        <a href="">
                                            <img src="https://clicko-html.vercel.app/assets/image/footer/insta3.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="gallery-thumb">
                                        <a href="">
                                            <img src="https://clicko-html.vercel.app/assets/image/footer/insta4.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="gallery-thumb">
                                        <a href="">
                                            <img src="https://clicko-html.vercel.app/assets/image/footer/insta5.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="gallery-thumb">
                                        <a href="">
                                            <img src="https://clicko-html.vercel.app/assets/image/footer/insta6.jpg" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="row align-items-center justify-content-center justify-content-lg-between flex-column-reverse flex-lg-row">
                        <div className="col-md-auto">
                            <p className="footer-copyright">
                                Copyright © <span>2026</span><a href=""> Clicko</a>. All rights reserved By <a href="">TN_Theme</a>.
                            </p>
                        </div>
                        <div className="col-md-auto">
                            <ul className='footer-botm-menu'>
                                <li>
                                    <a href="">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="">FAQ</a>
                                </li>
                                <li>
                                    <a href="">Feedback</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer