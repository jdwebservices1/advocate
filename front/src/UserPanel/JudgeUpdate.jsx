// UpdateJudge.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const UpdateJudge = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    
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
        } else {
            fetchJudgeDetails();
        }
    }, [navigate]);

    // Fetch judge details
    const fetchJudgeDetails = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://advocate-q881.onrender.com/api/judges/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            setFormData(data); // Set form data with fetched judge details
        } catch (error) {
            console.error('Error fetching judge details:', error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`https://advocate-q881.onrender.com/api/judges/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Judge updated successfully!');
                navigate('/judgelist'); // Redirect to judge list
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Could not update judge.'}`);
            }
        } catch (error) {
            console.error('Error updating judge:', error);
            alert('An error occurred while updating the judge.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <h2>Update Judge</h2>
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
                <button type="submit" className="btn btn-primary">Update Judge</button>
            </form>
        </div>
        </>
    );
};

export default UpdateJudge;
