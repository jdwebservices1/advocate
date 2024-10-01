import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    // Fetch the list of clients
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/clients', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                console.log(response);
                if(response.ok) {
                    const data = await response.json();
                    setClients(data);
                }else if (response.status == 401) {
                    navigate('/login');
                    
                }

                
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };

        fetchClients();
    }, [token]);

    // Handle delete client
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/client/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                
                if (response.ok) {
                    alert('Client deleted successfully');
                    setClients(clients.filter(client => client._id !== id));
                } else {
                    alert('Failed to delete client');
                }
            } catch (error) {
                console.error('Error deleting client:', error);
            }
        }
    };

    // Navigate to edit client
    const handleEdit = (id) => {
        navigate(`/clientsupdate/update/${id}`);
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <h2>Client List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Action</th>
                        <th>Documents</th>
                        <th>Documents List</th>
                        <th>Payments</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client._id}>
                            <td>{client.clientName} vs {client.secondPartyName}</td>
                            <td>{client.mobile}</td>
                            <td>{client.email}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => handleEdit(client._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm ms-2"
                                    onClick={() => handleDelete(client._id)}
                                >
                                    Delete
                                </button>
                            </td>

                            <td><Link to={`/clientDocumentUpload/update/${client._id}`}>Upload</Link></td>
                            <td><Link to={`/clientDocumentlist/${client._id}`}>List</Link></td>
                            <td><Link to={`/addPayments/${client._id}`}>Add</Link> | <Link to={`/ClientPayments/${client._id}`}>List</Link></td>
                            <td><Link to={`/UpdateStatus/${client._id}`}>Status Update</Link> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ClientList;
