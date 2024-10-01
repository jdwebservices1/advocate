// CaseTypeList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const CaseTypeList = () => {
    const [caseTypes, setCaseTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch case types on component mount
    useEffect(() => {
        const fetchCaseTypes = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('https://advocate-q881.onrender.com/api/casetype', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch case types');
                }

                const data = await response.json();
                console.log(data);
                setCaseTypes(data); // Assuming the API returns an array of case types
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCaseTypes();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const confirmDelete = window.confirm('Are you sure you want to delete this case type?');

        if (confirmDelete) {
            try {
                const response = await fetch(`https://advocate-q881.onrender.com/api/casetype/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    
                    
                    setCaseTypes(caseTypes.filter(caseType => caseType._id !== id));
                } else {
                    alert('Error deleting case type');
                }
            } catch (err) {
                alert('Error deleting case type');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <h2>Case Type List</h2>
            <Link to="/addcasetype" className="btn btn-primary mb-3">Add New Case Type</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Case Type Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {caseTypes.map(caseType => (
                        <tr key={caseType._id}>
                            <td>{caseType.caseType}</td>
                            <td>
                                <Link to={`/caseTypes/update/${caseType._id}`} className="btn btn-warning btn-sm">Edit</Link>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(caseType._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default CaseTypeList;
