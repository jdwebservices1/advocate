import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const UpdateStatus = () => {
    const { id } = useParams(); // Get the client ID from the URL
    const [status, setStatus] = useState(''); // State for selected status
    const [statusDate, setStatusDate] = useState('');
    const [statusComment, setStatusComment] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [statusHistory, setStatusHistory] = useState([]); // State to hold status history
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    // Fetch status history when component mounts
    useEffect(() => {
        const fetchStatusHistory = async () => {
            try {
                const response = await fetch(`https://advocate-q881.onrender.com/api/clients/${id}`, { // Adjust the endpoint to your API
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch status history');
                }

                const result = await response.json();
                setStatusHistory(result.statusHistory); // Set the status history in state
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStatusHistory();
    }, [id, token]); // Fetch status history on component mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // Prepare the data to be sent
        const updateData = {
            status,
            statusDate,
            statusComment
        };

        try {
            const response = await fetch(`https://advocate-q881.onrender.com/api/updateStatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updateData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update status');
            }

            setMessage(result.message); // Show success message

            // Optionally redirect to another page
            // navigate('/somewhere');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h2>Update Client Status</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                
                {/* Display status history */}
                <h4>Status History</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Status Date</th>
                            <th>Status Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statusHistory.length > 0 ? (
                            statusHistory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.status}</td>
                                    <td>{new Date(item.statusDate).toLocaleDateString()}</td>
                                    <td>{item.statusComment || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">No status history available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            id="status"
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">Choose a status</option>
                            <option value="Pending">Pending</option>
                            <option value="Decided">Decided</option>
                            <option value="Sine Die">Sine Die</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="statusDate" className="form-label">Status Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="statusDate"
                            value={statusDate}
                            onChange={(e) => setStatusDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="statusComment" className="form-label">Status Comment</label>
                        <textarea
                            className="form-control"
                            id="statusComment"
                            rows="3"
                            value={statusComment}
                            onChange={(e) => setStatusComment(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Status</button>
                </form>
            </div>
        </>
    );
};

export default UpdateStatus;
