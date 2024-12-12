import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

const SearchCaseByJudge = () => {
    const [judgeName, setJudgeName] = useState('');
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [notFound, setNotFound] = useState(false);

    const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
    const userID = localStorage.getItem('userID'); // Assuming the token is stored in localStorage

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setNotFound(false);
        setCases([]);
    
        if (!judgeName.trim()) {
            setError('Please enter a judge name to search');
            setLoading(false);
            return;
        }
    
        try {
            const response = await fetch('https://advocate-q881.onrender.com/api/searchByJudge', {
                method: 'POST', // Change to POST
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ judgeName,userID }) // Pass judgeName in the body
            });
    
            if (response.status === 404) {
                setNotFound(true);
                setLoading(false);
                return;
            }
    
            if (!response.ok) {
                throw new Error('Failed to fetch cases');
            }
    
            const data = await response.json();
            setCases(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-4">
              <h2 className='pb-5'>Search Cases by Judge</h2>
              <div className='shadow mb-5 p-4'>
            {/* Search Form */}
            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <label htmlFor="judgeName" className="form-label">Judge Name</label>
                    <input
                        type="text"
                        id="judgeName"
                        className="form-control"
                        value={judgeName}
                        onChange={(e) => setJudgeName(e.target.value)}
                        placeholder="Enter judge name"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
</div>
            {/* Loading */}
            {loading && <div className="mt-3">Loading...</div>}

            {/* Error */}
            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* Not Found Message */}
            {notFound && (
                <div className="alert alert-warning mt-3">
                    No cases found for the specified judge.
                </div>
            )}

            {/* Display Cases */}
            {cases.length > 0 && (
                <div className="mt-4">
                    <h4>Found {cases.length} case(s) for Judge {judgeName}</h4>
                    <ul className="list-group">
                        {cases.map((clientCase) => (
                            <li key={clientCase._id} className="list-group-item">
                                <h5>Client Name: {clientCase.clientName} vs {clientCase.secondPartyName}</h5>
                                <p>Case No: {clientCase.caseNo}</p>
                                <p>Judge Name: {clientCase.judgeName}</p>
                                <p>Status Date: {new Date(clientCase.statusDate).toLocaleDateString()}</p>
                                <p>Status: {clientCase.status}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </>
    );
};

export default SearchCaseByJudge;
