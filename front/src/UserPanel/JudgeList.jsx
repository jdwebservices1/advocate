// JudgeList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const JudgeList = () => {
    const [judges, setJudges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch judges on component mount
    useEffect(() => {
        const fetchJudges = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('https://advocate-q881.onrender.com/api/judges', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch judges');
                }

                const data = await response.json();
                setJudges(data); // Assuming the API returns an array of judges
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJudges();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (

        <>
        <Navbar />
        <div className="container mt-5">
              <h2 className='pb-5'>Judge List</h2>
            <Link to="/judges/add" className="btn btn-primary mb-3">Add New Judge</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Judge Name</th>
                        <th>Court Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {judges.map(judge => (
                        <tr key={judge._id}>
                            <td>{judge.judgeName}</td>
                            <td>{judge.courtName}</td>
                            <td>{judge.status}</td>
                            <td>
                                <Link to={`/judges/update/${judge._id}`} className="btn btn-warning btn-sm">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div></>
    );
};

export default JudgeList;
