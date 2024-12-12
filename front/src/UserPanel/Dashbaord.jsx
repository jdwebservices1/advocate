// Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import CasesPage from './CasesPages';


const Dashboard = () => {
    const navigate = useNavigate();

    // Validate user token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login if token doesn't exist
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('userID');

        // Redirect to login page
        navigate('/login');
    };

    // Retrieve user data from localStorage
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className='row'>
                    <div className='col'>
                        <p className='m-0'>Welcome, <strong>{name}</strong></p>
                        <p>Your email: {email}</p>
                        <CasesPage />


                    </div>
                    

                </div>



            </div>
        </>
    );
};

export default Dashboard;
