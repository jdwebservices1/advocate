import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ClientPayments = () => {
    const { caseId } = useParams(); // Get caseId from URL
    const [payments, setPayments] = useState([]); // State to hold payments
    const [clientName, setClientName] = useState(''); // State to hold client name
    const [error, setError] = useState(''); // State for error messages
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    // Fetch payments for the specific case
    useEffect(() => {

        console.log(caseId, "caseId");
        
        const fetchPayments = async () => {
            try {
                const response = await fetch(`https://advocate-q881.onrender.com/api/casePayments/${caseId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Use the token from localStorage
                    }
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login'); // Redirect to login if unauthorized
                    }
                    throw new Error('Failed to fetch payments');
                }

                const result = await response.json();
                setPayments(result.payments); // Set payments in state
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchCaseDetails = async () => {
            try {
                const response = await fetch(`https://advocate-q881.onrender.com/api/clients/${caseId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Use the token from localStorage
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch case details');
                }

                const caseDetails = await response.json();
                setClientName(caseDetails); // Set client name
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPayments();
        fetchCaseDetails(); // Fetch case details when component mounts
    }, [caseId, token, navigate]); // Fetch payments when caseId changes

    return (
        <>
            <Navbar />
            <div className="container mt-5">
            <Link to={`/Addpayments/${caseId}`} className="btn btn-primary mb-3">Add New Payment</Link>
            {/* <h2>Payments for Case ID: {caseId}</h2> */}
                {error && <div className="alert alert-danger">{error}</div>}
                
                {/* Display client name */}
                {clientName && <h4>Client Name: {clientName.clientName} vs {clientName.secondPartyName}</h4>}
                
                {payments.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Payment ID</th>
                                <th>Amount Paid</th>
                                <th>Payment Method</th>
                                <th>Remarks</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment._id}>
                                    <td>{payment._id}</td>
                                    <td>₹{payment.amountPaid}</td>
                                    <td>{payment.paymentMethod}</td>
                                    <td>{payment.remarks || 'N/A'}</td>
                                    <td>{new Date(payment.createdAt).toLocaleString()}</td> {/* Displaying the date */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="alert alert-info">No payments found for this case.</div>
                )}
            </div>
        </>
    );
};

export default ClientPayments;
