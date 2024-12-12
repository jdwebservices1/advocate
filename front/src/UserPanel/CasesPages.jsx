import React, { useState, useEffect } from 'react';
import nofound from '../../public/no found.png'
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
        return <div className='text-center'>
            <img src={nofound} alt="No cases found" style={{maxWidth:'200px',display:'block' , margin:'auto'}}/>
            <p>No cases found.</p></div>;
    }

    return (
        <>
  
        
        <ul className="list-group">
            {cases.map(clientCase => (

<div className="row justify-content-center">
<div className="col-md-12">
    <div className="card shadow mb-3">
        <div className="card-header bg-primary bg-gradient text-white">
            <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Case Details</p>
                <span className="badge bg-light text-primary">#{clientCase.caseNo}</span>
            </div>
        </div>
        <div className="card-body">
            <div className="row">
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="d-flex align-items-center mb-2">
                    <i class="fa-regular fa-user text-primary me-2"></i>
                        <h6 className="mb-0 text-muted">Client Name</h6>
                    </div>
                    <p className="fs-5 fw-bold">{clientCase.clientName}</p>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex align-items-center mb-2">
                    <i class="fa-regular fa-file text-primary me-2"></i>
                        <h6 className="mb-0 text-muted">Case Number</h6>
                    </div>
                    <p className="fs-5 fw-bold">{clientCase.caseNo}</p>
                </div>
                <div className="col-md-3 col-6 mb-3 mb-md-0">
                    <div className="d-flex align-items-center mb-2">
                    <i class="fa-regular fa-calendar text-primary me-2"></i>
                        <h6 className="mb-0 text-muted">Status Date</h6>
                    </div>
                    <p className="fs-5 fw-bold">{new Date(clientCase.statusDate).toLocaleDateString()}</p>
                </div>
                <div className="col-md-3 col-6">
                    <div className="d-flex align-items-center mb-2">
                    <i class="fa-solid fa-pen text-primary me-2"></i>
                        <h6 className="mb-0 text-muted">Current Status</h6>
                    </div>
                    <span className={`badge fs-6 px-3 py-2 
  ${clientCase.status === 'Pending' ? 'bg-warning text-dark' : 
  clientCase.status === 'Decided' ? 'bg-success text-light' : 
  clientCase.status === 'Sine Die' ? 'bg-danger text-light' : ''}`}>
  {clientCase.status}
</span>
                </div>
            </div>
            <div className="row">
               
            </div>
        </div>
    </div>
</div>
</div>

                
            ))}
        </ul>

        {/* <li key={clientCase._id} className="list-group-item">
                    <h5>Client Name: {clientCase.clientName}</h5>
                    <p>Case No: {clientCase.caseNo}</p>
                    <p>Status Date: {new Date(clientCase.statusDate).toLocaleDateString()}</p>
                    <p>Status: {clientCase.status}</p>
                </li> */}
        </>
    );
};

const CasesPage = () => {
    const token = localStorage.getItem('token'); // Assuming token is saved in localStorage

    return (
        <div className=" mt-4">
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
                            <h3 className='pb-4'>Today's Cases</h3>
                            <CasesTab endpoint="todayCases" token={token} />
                        </div>
                        <div className="tab-pane fade" id="tomorrowCases" role="tabpanel">
                            <h3 className='pb-4'>Tomorrow's Cases</h3>
                            <CasesTab endpoint="tomorrowCases" token={token} />
                        </div>
                        <div className="tab-pane fade" id="upcomingCases" role="tabpanel">
                            <h3 className='pb-4'>Upcoming Cases (Next 7 Days)</h3>
                            <CasesTab endpoint="upcomingCases" token={token} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CasesPage;
