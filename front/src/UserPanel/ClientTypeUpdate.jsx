// UpdateClientType.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const UpdateClientType = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [clientType, setClientType] = useState('');

    // Fetch client type details on mount
    useEffect(() => {
        const fetchClientTypeDetails = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`https://advocate-q881.onrender.com/api/clienttype/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data, "fad");
                    
                    setClientType(data.clientType);
                } else {
                    alert('Failed to fetch client type details.');
                }
            } catch (error) {
                console.error('Error fetching client type details:', error);
            }
        };

        fetchClientTypeDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://advocate-q881.onrender.com/api/clienttype/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ clientType: clientType }),
            });

            if (response.ok) {
                alert('Client type updated successfully!');
                navigate('/clienttypelist');
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Could not update client type.'}`);
            }
        } catch (error) {
            console.error('Error updating client type:', error);
            alert('An error occurred while updating the client type.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5">
              <h2 className='pb-5'>Update Client Type</h2>
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
                <button type="submit" className="btn btn-primary">Update Client Type</button>
            </form>
        </div>
        </>
    );
};

export default UpdateClientType;
