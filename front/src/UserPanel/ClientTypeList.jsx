// ClientTypeList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ClientTypeList = () => {
    const [clientTypes, setClientTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch client types on component mount
    useEffect(() => {
        const fetchClientTypes = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch('https://advocate-q881.onrender.com/api/clienttype', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch client types');
                }

                const data = await response.json();
                console.log(data);
                
                setClientTypes(data); // Assuming the API returns an array of client types
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClientTypes();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        const confirmDelete = window.confirm('Are you sure you want to delete this client type?');

        if (confirmDelete) {
            try {
                const response = await fetch(`https://advocate-q881.onrender.com/api/clienttype/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setClientTypes(clientTypes.filter(clientType => clientType._id !== id));
                } else {
                    alert('Error deleting client type');
                }
            } catch (err) {
                alert('Error deleting client type');
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <Navbar />
        <div className="container mt-5">
              <h2 className='pb-5'>Client Type List</h2>
            <Link to="/addclienttype" className="btn btn-primary mb-3">Add New Client Type</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Client Type Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clientTypes.map(clientType => (
                        <tr key={clientType._id}>
                            <td>{clientType.clientType}</td>
                            <td>
                                <Link to={`/clienttype/update/${clientType._id}`} className="btn btn-warning btn-sm">Edit</Link>
                                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(clientType._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ClientTypeList;
