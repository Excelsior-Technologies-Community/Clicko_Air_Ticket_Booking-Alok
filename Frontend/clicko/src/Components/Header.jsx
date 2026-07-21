import React from 'react'
import "../Css/header.css"
import { Link } from 'react-router-dom'
import AnimatedLink from './AnimatedLink'

const Header = () => {
    return (
        <section className='Header-section'>
            <div className="header">
                <div className="header-top">
                    <div className="container">
                        <div className="row align-items-center justify-content-between gy-1 text-center text-lg-start">
                            <div className="col-lg-auto">
                                <div className='d-flex align-items-center flex-wrap gap-4'>
                                    <div className="tn-header-info">
                                        <i className='fa-solid fa-envelope'></i>
                                        <a href="">info@company.com</a>
                                    </div>
                                    <div className="tn-header-info">
                                        <i className='fa-solid fa-phone-volume'></i>
                                        <a href="">+1 333 608 998</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-auto">
                                <div className='tn-header__right-txt d-flex align-items-center flex-wrap gap-4'>
                                    <div className='d-flex align-items-center gap-3 justify-content-center'>
                                        <span>FOLLOW US ON :</span>
                                        <div className='d-flex align-items-center gap-2 tn-header-social'>
                                            <a href=""><i className='fab fa-facebook-f'></i></a>
                                            <a href=""><i className='fa-brands fa-x-twitter'></i></a>
                                            <a href=""><i className='fab fa-instagram'></i></a>
                                            <a href=""><i className='fab fa-behance'></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky-header">
                    <div className="container">
                        <div className='row justify-content-between align-items-center'>
                            <div className="col">
                                <div className="header-logo">
                                    <AnimatedLink to="/">
                                        <img src="https://clicko-html.vercel.app/assets/image/logo.svg" alt="" />
                                    </AnimatedLink>
                                </div>
                            </div>
                            <div className="col-auto">
                                <nav className='main-menu d-lg-block'>
                                    <ul>
                                        <li className='main-menu-item'>
                                            <AnimatedLink to="/">Home</AnimatedLink>
                                        </li>
                                        <li className='main-menu-item'>
                                            <AnimatedLink to="/about">About us</AnimatedLink>
                                        </li>
                                        <li className='main-menu-item dropdown-item-has-children'>
                                            <Link to="#">Tickets</Link>
                                            <ul className="dropdown-menu-list">
                                                <li>
                                                    <AnimatedLink to="/booking">
                                                        <i className="fa-solid fa-angles-right"></i> Booking
                                                    </AnimatedLink>
                                                </li>
                                                <li>
                                                    <AnimatedLink to="/booking-details">
                                                        <i className="fa-solid fa-angles-right"></i> Booking Details
                                                    </AnimatedLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='main-menu-item'>
                                            <Link>Pages</Link>
                                            <ul className="dropdown-menu-list pagesdrop-menu">
                                                <li>
                                                    <div className='pages-drop'>PAGE LIST 1</div>
                                                    <ul>
                                                        <li>
                                                            <AnimatedLink to="/booking">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Home 01
                                                            </AnimatedLink>
                                                        </li>
                                                        <li>
                                                            <AnimatedLink to="/booking">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Home 02
                                                            </AnimatedLink>
                                                        </li>
                                                        <li>
                                                            <AnimatedLink to="/about">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                About Us
                                                            </AnimatedLink>
                                                        </li>
                                                        <li>
                                                            <AnimatedLink to="/service">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Service
                                                            </AnimatedLink>
                                                        </li>
                                                        <li>
                                                            <AnimatedLink to="/servicedetail">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Service Details
                                                            </AnimatedLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className='pages-drop'>PAGE LIST 2</div>
                                                    <ul>
                                                        <li>
                                                            <AnimatedLink to="/booking">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Booking
                                                            </AnimatedLink>
                                                        </li>
                                                        <li>
                                                            <AnimatedLink to="/booking">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Booking Details
                                                            </AnimatedLink>
                                                        </li>
                                                        <li>
                                                            <AnimatedLink to="/booking">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Blog
                                                            </AnimatedLink>
                                                        </li>
                                                        <li>
                                                            <AnimatedLink to="/booking">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Blog Details
                                                            </AnimatedLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <div className='pages-drop'>PAGE LIST 3</div>
                                                    <ul>
                                                        <li>
                                                            <AnimatedLink to="/contact">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                Contact Us
                                                            </AnimatedLink>
                                                        </li>
                                                        <li>
                                                            <AnimatedLink to="/error">
                                                                <i className="fa-solid fa-angles-right"></i>
                                                                404 Page
                                                            </AnimatedLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='main-menu-item'>
                                            <Link>Blog</Link>
                                            <ul className="dropdown-menu-list">
                                                <li>
                                                    <AnimatedLink to="/booking">
                                                        <i className="fa-solid fa-angles-right"></i> Blog
                                                    </AnimatedLink>
                                                </li>
                                                <li>
                                                    <AnimatedLink to="/booking-details">
                                                        <i className="fa-solid fa-angles-right"></i> Blog Details
                                                    </AnimatedLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='main-menu-item'>
                                            <AnimatedLink to='/contact'>Contact</AnimatedLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="col-auto">
                                <div className="header-action">
                                    <div className='country-select d-none d-xl-inline-flex align-items-center'>
                                        <div class="dropdown">
                                            <button class="btn-secondary country-select_btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img src="https://clicko-html.vercel.app/assets/image/flags/us.svg" alt="" />
                                                <span>USD</span>
                                                <i className='fa-solid fa-angle-down'></i>
                                            </button>
                                            <ul class="dropdown-menu country-select_list" aria-labelledby="dropdownMenuButton1">
                                                <li>
                                                    <img src="https://clicko-html.vercel.app/assets/image/flags/us.svg" alt="" />
                                                    USD
                                                </li>
                                                <li>
                                                    <img src="http://clicko-html.vercel.app/assets/image/flags/fr.svg" alt="" />
                                                    EUR
                                                </li>
                                                <li>
                                                    <img src="https://clicko-html.vercel.app/assets/image/flags/de.svg" alt="" />
                                                    EUR
                                                </li>
                                                <li>
                                                    <img src="https://clicko-html.vercel.app/assets/image/flags/vn.svg" alt="" />
                                                    VND
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* offcanvas-left */}
                                    <button class="searchBoxTggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                                        <i className='fa-solid fa-magnifying-glass'></i>
                                    </button>
                                    <div class="offcanvas offcanvas-start popup-search-box" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                                        <div class="offcanvas-header">
                                            <button type="button" class="text-reset searchclose" data-bs-dismiss="offcanvas" aria-label="Close">
                                                <i className='fa-solid fa-xmark'></i>
                                            </button>
                                        </div>
                                        <div class="offcanvas-body">
                                            <form action="">
                                                <input type="text" placeholder='What are you looking for' />
                                                <button type='submit'>
                                                    <i className='fa-solid fa-magnifying-glass'></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    {/* offcanvas-right */}
                                    <button class="btn right-sidemenu_butn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                        <i className='fa-solid fa-bars'></i>
                                    </button>
                                    <div class="offcanvas offcanvas-end side-wrapper" data-bs-scroll="true" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                        <div className="sidemenu-content">
                                            <div class="offcanvas-header sidemenu-logo">
                                                <a href="">
                                                    <img src="https://clicko-html.vercel.app/assets/image/logo.svg" alt="" />
                                                </a>
                                                <button type="button" class="text-reset sidemenu-close" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
                                            </div>
                                            <hr className='sidemenu-hr sidemenu-item' />
                                            <div class="offcanvas-body sidemenu-inner">
                                                <div className="sidemenu-body">
                                                    <p className='sidemenu-item text-capitalize'>right private jet is essential for a comfortable, efficient and
                                                        travel experience. we believe in the transmative power of travel.
                                                    </p>
                                                    <h4 className='sidemenu-subtitle'>CONTACT US</h4>
                                                    <div className='sidemenu-contact'>
                                                        <ul>
                                                            <li>
                                                                <a href="" className='sidemenu-link'>
                                                                    +9 555 224 7849
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="" className='sidemenu-link'>
                                                                    info@clicko.com
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="" className='sidemenu-link'>
                                                                    Munich Expresswa 70 Germany, TX 7859
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <h4 className='sidemenu-subtitle' style={{ marginTop: '40px' }}>SUBSCRIBE</h4>
                                                    <div className='sidemenu-subscribe'>
                                                        <form action="">
                                                            <input type="text" placeholder='Enter Your Email...' />
                                                            <a href="">
                                                                <i className='flaticon-send'></i>
                                                            </a>
                                                        </form>
                                                        <p>Subscribe to get the latest updates, tips, and insights delivered straight to your inbox.</p>
                                                    </div>
                                                    <div className="sidemenu-footer">
                                                        <hr className='sidemenu-hr sidemenu-item' />
                                                        <div className="sidemenu-footer-social">
                                                            <span>FOLLOW US ON : </span>
                                                            <a href="">
                                                                <i className='fab fa-facebook-f'></i>
                                                            </a>
                                                            <a href="">
                                                                <i className='fa-brands fa-x-twitter'></i>
                                                            </a>
                                                            <a href="">
                                                                <i className='fab fa-instagram'></i>
                                                            </a>
                                                            <a href="">
                                                                <i className='fab fa-behance'></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header