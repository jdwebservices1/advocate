import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

const SearchCaseByMonthYear = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cases, setCases] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')

        // Reset error state before making the request
        setError('');

        if (!month || !year) {
            setError('Please select both month and year.');
            return;
        }

        try {
            const response = await fetch('https://advocate-q881.onrender.com/api/searchByMonthYear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Attach token for authenticated routes
                  },
                body: JSON.stringify({ month, year }),
            });

            if (response.ok) {
                const data = await response.json();
                setCases(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Something went wrong');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <h2>Search Cases by Month and Year</h2>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="month">Month</label>
                            <select
                                id="month"
                                className="form-control"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                required
                            >
                                <option value="">Select Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <input
                                type="number"
                                id="year"
                                className="form-control"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                placeholder="Enter Year (e.g., 2024)"
                                required
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Search Cases
                </button>
            </form>

            {error && (
                <div className="alert alert-danger mt-4" role="alert">
                    {error}
                </div>
            )}

            <div className="mt-4">
                {cases.length > 0 ? (
                    <div>
                        <h4>Cases for {month}/{year}:</h4>
                        <ul className="list-group">
                            {cases.map((clientCase) => (
                                <li key={clientCase._id} className="list-group-item">
                                    <strong>Case ID:</strong> {clientCase._id} <br />
                                    <strong>Judge Name:</strong> {clientCase.judgeName} <br />
                                    <strong>Status Date:</strong> {new Date(clientCase.statusDate).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No cases found for this month and year.</p>
                )}
            </div>
        </div>
        </>
    );
};

export default SearchCaseByMonthYear;
