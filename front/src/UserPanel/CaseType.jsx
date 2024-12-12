// AddCaseType.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const CaseType = () => {
    const navigate = useNavigate();
    const [caseType, setcaseType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const fetchuserid = localStorage.getItem('userID')
        try {
        
            const response = await fetch('https://advocate-q881.onrender.com/api/casetype', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ caseType, userId: fetchuserid }),
            });

            if (response.ok) {
                alert('Case type added successfully!');
                navigate('/casetypelist');
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Could not add case type.'}`);
            }
        } catch (error) {
            console.error('Error adding case type:', error);
            alert('An error occurred while adding the case type.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5">
              <h2 className='pb-5'>Add Case Type </h2>
              <div className='shadow mb-5 p-4'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Case Type Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={caseType}
                        onChange={(e) => setcaseType(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Case Type</button>
            </form>
        </div>
        </div>
        </>
    );
};

export default CaseType;
