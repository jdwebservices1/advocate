import React from 'react'
import './Home.css'
import advo from '../../public/advocate.png'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className='bg'>

                <header className='py-5'>
                    <div className='container text-center'>
                        <h4 className="subhead  mb-2 fw-bold font-mon"><span>ADVOC8</span></h4>
                        <div className='row'>
                            <nav className='navbar navbar-expand-lg borderbottom'>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="navbarNav">
                                    <ul class="navbar-nav  mx-auto text-uppercase ">
                                        <li class="nav-item"><a class="nav-link text-white" href="/">Home</a></li>
                                        <li class="nav-item"><a class="nav-link text-white" href="/login">LOGIN</a></li>
                                        <li class="nav-item"><a class="nav-link text-white" href="/signup">SIGNUP</a></li>
                                        {/* <li class="nav-item"><a class="nav-link text-white" href="#">Contact</a></li> */}
                                    </ul>
                                    
                                </div>

                            </nav>
                        </div>
                    </div>
                </header>
                <section className="hero-section d-flex z-index-0  align-items-center position-relative">
                    <div className="shape right"></div>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <h1 className="display-4 fw-bold mb-4 font-mon">Now Manage Advocate's <span className="text-primary">Daily</span>  Diary Online</h1>
                                <p className="lead mb-4"><strong>ADVOC8</strong> is software for advocates and legal firms to maintain daily case diary, clients, documents and much more! Just create your account and start going, no strings attached!</p>
                                <Link to="/login" className="btn btn-primary me-3">Login</Link>
                                <Link to="/signup" className="btn btn-primary">Create an account</Link>
                            </div>
                            <div className="col-lg-6">
                                <img src={advo} alt="ADVOC8" className="img-ani w-75 m-auto d-block img-fluid" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section start */}
                <section className="hero-section z-index-0 position-relative d-flex section2 align-items-center">

                    <div className="shape2 left"></div>
                    <div className="container">
                        <div className="row d-flex align-items-center">
                            <div className="text-center as">
                                <h6 className="subhead mb-2 fw-bold font-mon"><span>Rich In</span></h6>
                                <h2 className="font-mon text-uppercase font-bold">Features</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-md-3 col-6'>
                                <div className='speciality-box'>
                                    <div className='icon'>
                                        <i className="fa fa-3x fa-legal text-primary sr-icons text-white"></i>
                                    </div>
                                    <h3 className='py-2 text-uppercase fs-20'>Cases</h3>
                                    <p>List Today's, Tomorrow's & Date Awaited Cases.</p>
                                    <h3 className='number display-5 fw-bold'>01</h3>
                                </div>

                            </div>
                            <div className='col-md-3 col-6'>
                                <div className='speciality-box'>
                                    <div className='icon'>
                                        <i className="fa fa-3x fa-legal fa-history text-primary sr-icons text-white"></i>
                                    </div>
                                    <h3 className='py-2 text-uppercase fs-20'>Case History</h3>
                                    <p>Complete History of Case Hearing With All Previous Case Dates!</p>
                                    <h3 className='number display-5 fw-bold'>02</h3>
                                </div>

                            </div>
                            <div className='col-md-3 col-6'>
                                <div className='speciality-box'>
                                    <div className='icon'>
                                        <i className="fa fa-3x fa-book fa-history text-primary sr-icons text-white"></i>
                                    </div>
                                    <h3 className='py-2 text-uppercase fs-20'>Documents</h3>
                                    <p>Digitize all your case documents.</p>
                                    <h3 className='number display-5 fw-bold'>03</h3>
                                </div>

                            </div>
                            <div className='col-md-3 col-6'>
                                <div className='speciality-box'>
                                    <div className='icon'>
                                        <i className="fa fa-3x fa-bar-chart  text-primary sr-icons text-white"></i>
                                    </div>
                                    <h3 className='py-2 text-uppercase fs-20'>Reports</h3>
                                    <p>Generate & Print Reports using CNR No., Case No., Ref. No., Date etc</p>
                                    <h3 className='number display-5 fw-bold'>04</h3>
                                </div>

                            </div>
                            <div className='col-md-3 col-6'>
                                <div className='speciality-box'>
                                    <div className='icon'>
                                        <i className="fa fa-3x fa-users  text-primary sr-icons text-white"></i>
                                    </div>
                                    <h3 className='py-2 text-uppercase fs-20'>Client Details</h3>
                                    <p>Keep client details handy and easily accessible.</p>
                                    <h3 className='number display-5 fw-bold'>05</h3>
                                </div>

                            </div>
                            <div className='col-md-3 col-6'>
                                <div className='speciality-box'>
                                    <div className='icon'>
                                        <i className="fa-solid fa-money-bill fa-3x text-primary sr-icons text-white"></i>
                                    </div>
                                    <h3 className='py-2 text-uppercase fs-20'>Case Fee</h3>
                                    <p>No need to remember case fees. Keep it private and secure.</p>
                                    <h3 className='number display-5 fw-bold'>06</h3>
                                </div>

                            </div>
                            <div className='col-md-3 col-6'>
                                <div className='speciality-box'>
                                    <div className='icon'>
                                        <i className="fa fa-3x fa-rupee  text-primary sr-icons text-white"></i>
                                    </div>
                                    <h3 className='py-2 text-uppercase fs-20'>Payments</h3>
                                    <p>Tracks the case payments and show any pending payments.</p>
                                    <h3 className='number display-5 fw-bold'>07</h3>
                                </div>

                            </div>





                        </div>
                    </div>

                </section>

                {/* <section className="hero-section z-index-0 position-relative d-flex section2 align-items-center">

                <div className="shape right"></div>
                <div className='container'>
                    <div className="row justify-content-center">
                        <div className="text-center">
                            <h2 className='font-mon text-uppercase font-bold'>What unique features do we offer?</h2>

                                <div className='col-md-6 offset-md-3'>
                                    <div className='border2'>
                                        <ul>
                                            <li></li>
                                        </ul>

                                    </div>
                                   

                                </div>
                        </div>
                    </div>
                </div>

                </section> */}
            </div>
        </>
    )
}

export default Home