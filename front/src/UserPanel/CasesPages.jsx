import React, { useState, useEffect } from 'react';

// Reusable component to fetch and display cases
const CasesTab = ({ endpoint, token }) => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await fetch(`https://advocate-q881.onrender.com/api/${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch ${endpoint}`);
                }

                const data = await response.json();
                setCases(data[`${endpoint}`] || []);  // Dynamically fetch the correct key
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCases();
    }, [endpoint, token]);

    if (loading) {
        return <div>Loading cases...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (cases.length === 0) {
        return <div>No cases found.</div>;
    }

    return (
        <ul className="list-group">
            {cases.map(clientCase => (
                <li key={clientCase._id} className="list-group-item">
                    <h5>Client Name: {clientCase.clientName}</h5>
                    <p>Case No: {clientCase.caseNo}</p>
                    <p>Status Date: {new Date(clientCase.statusDate).toLocaleDateString()}</p>
                    <p>Status: {clientCase.status}</p>
                </li>
            ))}
        </ul>
    );
};

const CasesPage = () => {
    const token = localStorage.getItem('token'); // Assuming token is saved in localStorage

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Case Management</h2>

            <div className="row">
                <div className="col-md-3">
                    <ul className="nav flex-column nav-pills" id="case-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="today-cases-tab" data-bs-toggle="pill" href="#todayCases" role="tab">Today's Cases</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="tomorrow-cases-tab" data-bs-toggle="pill" href="#tomorrowCases" role="tab">Tomorrow's Cases</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="upcoming-cases-tab" data-bs-toggle="pill" href="#upcomingCases" role="tab">Upcoming Cases</a>
                        </li>
                    </ul>
                </div>

                <div className="col-md-9">
                    <div className="tab-content" id="case-tabs-content">
                        <div className="tab-pane fade show active" id="todayCases" role="tabpanel">
                            <h3>Today's Cases</h3>
                            <CasesTab endpoint="todayCases" token={token} />
                        </div>
                        <div className="tab-pane fade" id="tomorrowCases" role="tabpanel">
                            <h3>Tomorrow's Cases</h3>
                            <CasesTab endpoint="tomorrowCases" token={token} />
                        </div>
                        <div className="tab-pane fade" id="upcomingCases" role="tabpanel">
                            <h3>Upcoming Cases (Next 7 Days)</h3>
                            <CasesTab endpoint="upcomingCases" token={token} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CasesPage;
