// AddClientType.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const AddClientType = () => {
    const navigate = useNavigate();
    const [clientType, setClientType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const fetchuserid = localStorage.getItem('userID')
        try {
            const response = await fetch('https://advocate-q881.onrender.com/api/clienttype', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ clientType: clientType, userId: fetchuserid }),
            });

            if (response.ok) {
                alert('Client type added successfully!');
                navigate('/clienttypelist');
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Could not add client type.'}`);
            }
        } catch (error) {
            console.error('Error adding client type:', error);
            alert('An error occurred while adding the client type.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <h2>Add Client Type</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Client Type Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={clientType}
                        onChange={(e) => setClientType(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Client Type</button>
            </form>
        </div>
        </>
    );
};

export default AddClientType;
