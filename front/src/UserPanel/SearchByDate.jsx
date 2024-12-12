import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

const SearchCaseByDate = () => {
  const [date, setDate] = useState('');
  const [cases, setCases] = useState([]);
  const [error, setError] = useState('');
  
  // Function to handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');  // Reset error state
    const token = localStorage.getItem('token')

    try {
      // Make a request to the search API
      const response = await fetch('https://advocate-q881.onrender.com/api/searchByDate', {
        method: 'POST', // Use POST because we're sending data in the body
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach token for authenticated routes
        },
        body: JSON.stringify({ date }) // Send date in the request body
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to search cases');
      }

      setCases(data); // Set the fetched cases in state
    } catch (err) {
      setError(err.message);  // Set error message in state
    }
  };

  return (

    <>
    <Navbar />
    <div className="container mt-5">
        <h2 className='pb-5'>Search Cases by Date</h2>
        <div className='shadow mb-5 p-4'>
      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Select Date</label>
          <input 
            type="date" 
            className="form-control" 
            id="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
</div>
      {/* Error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Display results */}
      {cases.length > 0 && (
        <div>
          <h3>Cases Found:</h3>
          <ul className="list-group">
            {cases.map((clientCase) => (
              <li key={clientCase._id} className="list-group-item">
                <strong>Case No:</strong> {clientCase.caseNo}<br />
                <strong>Client Name:</strong> {clientCase.clientName}<br />
                <strong>Filing Date:</strong> {new Date(clientCase.fileOn).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
};

export default SearchCaseByDate;
