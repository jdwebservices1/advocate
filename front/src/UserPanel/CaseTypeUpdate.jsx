// UpdateCaseType.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCaseType = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [caseType, setcaseType] = useState('');

    // Validate user token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchCaseTypeDetails();
        }
    }, [navigate]);

    const fetchCaseTypeDetails = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://advocate-q881.onrender.com/api/casetype/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            console.log(data, "data");
            
            
            setcaseType(data.caseType); // Set form data with fetched case type details
        } catch (error) {
            console.error('Error fetching case type details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://advocate-q881.onrender.com/api/casetype/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ caseType }),
            });

            if (response.ok) {
                alert('Case type updated successfully!');
                navigate('/casetypelist');
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Could not update case type.'}`);
            }
        } catch (error) {
            console.error('Error updating case type:', error);
            alert('An error occurred while updating the case type.');
        }
    };

    return (
        <div className="container mt-5">
              <h2 className='pb-5'>Update Case Type</h2>
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
                <button type="submit" className="btn btn-primary">Update Case Type</button>
            </form>
        </div>
    );
};

export default UpdateCaseType;
