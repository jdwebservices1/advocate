// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
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
        const response = await fetch('https://advocate-q881.onrender.com/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Signup successful!');
            navigate('/')
            // Optionally redirect or clear the form
        } else {
            alert(data.error || 'Signup failed');
        }
    };

    return (
        <>

            <section className='bg-light'>
                <div className='container-fluid'>
                    <div className="row">

                        <div className="col-lg-6 d-none d-lg-block bg-image">
                            <div className="d-flex flex-column justify-content-center h-100 p-5 text-white">
                             
                                
                            </div>
                        </div>

                        <div className="col-lg-6">
                                    <div className="login-container d-flex align-items-center justify-content-center p-4">
                                        <div className="w-100" style={{ maxWidth: '400px' }}>
                                            <h1 className="display-4 mb-3 text-center">Welcome</h1>
                                            <p className="text-center text-muted mb-5">Sign Up with Email</p>

                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label">Name</label>
                                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                                </div>
                                                <button type="submit" className="btn btn-primary">Signup</button>



                                            </form>
                                        </div>
                                    </div>
                                </div>



                    </div>
                </div>
            </section>
            {/* <div className="container mt-5">
                  <h2 className='pb-5'>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
            </div> */}
        </>

    );
};

export default Signup;
