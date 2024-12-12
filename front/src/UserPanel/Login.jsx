// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import advo from '../../public/advocate.jpg'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://advocate-q881.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            // Save token, email, and name in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('name', data.user.name);
            localStorage.setItem('userID', data.user.id);
            
            alert('Login successful!');
            // Optionally redirect or clear the form
            navigate("/dashboard")
        } else {
            alert(data.error || 'Login failed');
        }
    };

    return (
       <>
       <section className='bg-light'>
        <div className='container-fluid'>
       <div className="row">
           
            <div className="col-lg-6 d-none d-lg-block bg-image">
                <div className="d-flex flex-column justify-content-center h-100 p-5 text-white">
                    {/* <h1 className="brand-text text-white mb-3">Travelista Tours</h1>
                    <p className="lead">Travel is the only purchase that enriches you in ways beyond material wealth</p> */}
                </div>
            </div>
      
            <div className="col-lg-6">
                <div className="login-container d-flex align-items-center justify-content-center p-4">
                    <div className="w-100" style={{maxWidth:'400px'}}>
                        <h1 className="display-4 mb-3 text-center">Welcome</h1>
                        <p className="text-center text-muted mb-5">Login with Email</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label for="email" className="form-label">Email id</label>
                                <input type="email" className="form-control form-control-lg" id="email" placeholder="thisuser@email.com" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            
                            <div className="mb-3">
                                <label for="password" className="form-label">Password</label>
                                <input type="password" className="form-control form-control-lg" name="password" value={formData.password} onChange={handleChange} required id="password" placeholder="****************" />
                            </div>
                            
                            <div className="text-end mb-4">
                                <a href="#" className="text-decoration-none">Forgot your password?</a>
                            </div>
                            
                            <button type="submit" className="btn btn-primary w-100 btn-lg mb-4">LOGIN</button>
                            
                          
                           
                            
                            <p className="text-center">
                                Don't have account? <Link to='/signup' className="text-decoration-none">Register Now</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>

       </section>
        {/* <div className="container mt-5">
              <h2 className='pb-5'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>

                <div className='row py-3'>
                    <Link className='text-dark text-decoration-none' to='/signup'>Click here for Sign Up!</Link>
                </div>
            </form>
        </div> */}
       </>
    );
};

export default Login;
