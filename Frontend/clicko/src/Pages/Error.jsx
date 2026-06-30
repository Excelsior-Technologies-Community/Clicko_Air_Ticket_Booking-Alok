import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/all.css'

const Error = () => {
    return (
        <main className='Error-Page'>
            <section className='banner-area'>
                <div className="container">
                    <div className='tn-breadcrumb__wrapper z-index-common text-center'>
                        <h2 className='text-white mb-15'>error 404</h2>
                        <nav>
                            <ol class="breadcrumb justify-content-center">
                                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                <li class="breadcrumb-item active" aria-current="page">404 Page</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </section>
            <section className='z-index-common space'>
                <div className="container">
                    <div className='row justify-content-center'>
                        <div className="col-lg-12 text-center">
                            <div className="tn-404__content">
                                <img src="https://clicko-html.vercel.app/assets/image/bg/404.png" className='mb-40' alt="" />
                                <h2 className='mb-10'>“ oops! page not found ”</h2>
                                <p className='mb-30 text-capitalize'>The page you are looking for does not exist. Maybe try one of the links below or a search?</p>
                                <Link to="" className='tn-btn tn-btn__red'>
                                    Back To Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Error