import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const AddPayments = () => {
    const { caseId, clientId } = useParams(); // Extract caseId and clientId from URL
    const [clients, setClients] = useState([]); // State to hold clients
    const [selectedClient, setSelectedClient] = useState(clientId || ''); // Auto-select client if clientId exists
    const [clientDetails, setClientDetails] = useState(null); // State for client details
    const [amountPaid, setAmountPaid] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [remarks, setRemarks] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    // Fetch clients from the API
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('https://advocate-q881.onrender.com/api/clients', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Use the token from localStorage
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login'); // Redirect to login if unauthorized
                    }
                    throw new Error('Failed to fetch clients');
                }

                const result = await response.json();

                // Ensure result is an array of clients
                if (Array.isArray(result)) {
                    setClients(result);
                } else {
                    throw new Error('Invalid response structure');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchClients();
    }, [token, navigate]); // Add token and navigate to dependency array

    // Fetch client details when a client is selected
    useEffect(() => {
        const fetchClientDetails = async () => {
            if (selectedClient) {
                try {
                    const response = await fetch(`https://advocate-q881.onrender.com/api/caseBalance/${selectedClient}`, {
                        headers: {
                            'Authorization': `Bearer ${token}` // Use the token from localStorage
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch client details');
                    }

                    const result = await response.json();
                    setClientDetails(result); // Update client details state
                } catch (err) {
                    setError(err.message);
                }
            } else {
                setClientDetails(null); // Reset client details if no client is selected
            }
        };

        fetchClientDetails();
    }, [selectedClient, token]); // Trigger when selectedClient changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // Prepare the data to be sent
        const paymentData = {
            clientId: selectedClient, // Include selected clientId
            amountPaid: parseFloat(amountPaid),
            paymentMethod,
            remarks
        };

        try {
            const response = await fetch(`https://advocate-q881.onrender.com/api/addPayment/${selectedClient}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Assuming you store the token in localStorage
                },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Payment failed');
            }

            setMessage(result.message);
            // Clear the form fields after successful payment
            setAmountPaid('');
            setRemarks('');
            setSelectedClient(''); // Clear selected client
            setClientDetails(null); // Reset client details
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                  <h2 className='pb-5'>Add Payment</h2>
                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className='shadow mb-5 p-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="client" className="form-label">Select Client</label>
                        <select
                            id="client"
                            className="form-select"
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            required
                        >
                            <option value="">Choose a client</option>
                            {clients.length > 0 ? (
                                clients.map((client) => (
                                    <option key={client._id} value={client._id}>
                                        {client.clientName} vs {client.secondPartyName} - ₹{client.totalFee}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No clients available</option>
                            )}
                        </select>
                    </div>

                    {/* Show client details */}
                    {clientDetails && (
                        <div className="mb-3">
                            <h5>Client Details:</h5>
                            <p>Total Fee: ₹{clientDetails.totalFee}</p>
                            <p>Total Paid: ₹{clientDetails.totalPaid}</p>
                            <p>Remaining Balance: ₹{clientDetails.remainingBalance}</p>
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="amountPaid" className="form-label">Amount Paid</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amountPaid"
                            value={amountPaid}
                            onChange={(e) => setAmountPaid(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                        <select
                            className="form-select"
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                            <option value="online">Online</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="remarks" className="form-label">Remarks</label>
                        <textarea
                            className="form-control"
                            id="remarks"
                            rows="3"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Payment</button>
                </form>
                </div>
            </div>
        </>
    );
};

export default AddPayments;
