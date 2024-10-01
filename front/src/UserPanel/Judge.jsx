// JudgeAdd.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Judge = () => {
    const navigate = useNavigate();

    // State to hold form data
    const [formData, setFormData] = useState({
        courtCode: '',
        buildingNo: '',
        floorNo: '',
        roomNo: '',
        subRoom: '',
        courtName: '',
        judgeName: '',
        status: 'Active', // Default value
        policeStation: '',
        place: '',
    });

    // Validate user token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchuserid = localStorage.getItem('userID')
        const token = localStorage.getItem('token');

        // Send a POST request to add the judge
        try {
            const response = await fetch('https://advocate-q881.onrender.com/api/judges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    userId: fetchuserid
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Judge added successfully!');
                navigate('/dashboard'); // Redirect to dashboard after successful addition
            } else {
                alert(`Error: ${data.error || 'Could not add judge.'}`);
            }
        } catch (error) {
            console.error('Error adding judge:', error);
            alert('An error occurred while adding the judge.');
        }
    };

    return (
        <>
         <Navbar />
        <div className="container mt-5">
            <h2>Add New Judge</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Court Code</label>
                    <input
                        type="text"
                        className="form-control"
                        name="courtCode"
                        value={formData.courtCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Building No</label>
                    <input
                        type="text"
                        className="form-control"
                        name="buildingNo"
                        value={formData.buildingNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Floor No</label>
                    <input
                        type="text"
                        className="form-control"
                        name="floorNo"
                        value={formData.floorNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Room No</label>
                    <input
                        type="text"
                        className="form-control"
                        name="roomNo"
                        value={formData.roomNo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Sub Room</label>
                    <input
                        type="text"
                        className="form-control"
                        name="subRoom"
                        value={formData.subRoom}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Court Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="courtName"
                        value={formData.courtName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Judge Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="judgeName"
                        value={formData.judgeName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Status</label>
                    <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Police Station</label>
                    <input
                        type="text"
                        className="form-control"
                        name="policeStation"
                        value={formData.policeStation}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 col-lg-4 col-md-6">
                    <label className="form-label">Place</label>
                    <input
                        type="text"
                        className="form-control"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <button type="submit" className="btn btn-primary">Add Judge</button>
            </form>
        </div>
        </>
    );
};

export default Judge;
