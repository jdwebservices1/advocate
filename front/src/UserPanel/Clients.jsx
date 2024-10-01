import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Client = () => {
    const navigate = useNavigate();

    // State for form fields
    const [clientName, setClientName] = useState('');
    const [secondPartyName, setSecondPartyName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [judge, setJudge] = useState('');
    const [clientType, setClientType] = useState('');
    const [caseType, setCaseType] = useState('');
    const [fileOn, setFileOn] = useState('');
    const [filingNo, setFilingNo] = useState('');
    const [caseNo, setCaseNo] = useState('');
    const [firNo, setFirNo] = useState('');
    const [firDate, setFirDate] = useState('');
    const [policeStation, setPoliceStation] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [opponentAdvocate, setOpponentAdvocate] = useState('');
    const [totalFee, setTotalFee] = useState('');

    // Dropdown data
    const [judges, setJudges] = useState([]);
    const [clientTypes, setClientTypes] = useState([]);
    const [caseTypes, setCaseTypes] = useState([]);

    const token = localStorage.getItem('token');

    // Fetch dropdown data
    useEffect(() => {

        if(!token){
            navigate('/login')
        }


        const fetchDropdownData = async () => {
            try {
                const [judgeRes, clientTypeRes, caseTypeRes] = await Promise.all([
                    fetch('http://localhost:3001/api/judges', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:3001/api/clienttype', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch('http://localhost:3001/api/casetype', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                const judgesData = await judgeRes.json();
                const clientTypesData = await clientTypeRes.json();
                const caseTypesData = await caseTypeRes.json();

                setJudges(judgesData);
                setClientTypes(clientTypesData);
                setCaseTypes(caseTypesData);
            } catch (err) {
                console.error('Error fetching dropdown data:', err);
            }
        };

        fetchDropdownData();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchuserid = localStorage.getItem('userID')

        try {
            const response = await fetch('http://localhost:3001/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    clientName,
                    secondPartyName,
                    mobile,
                    email,
                    judge,
                    clientType,
                    caseType,
                    fileOn,
                    filingNo,
                    caseNo,
                    firNo,
                    firDate,
                    policeStation,
                    description,
                    address,
                    statusDate: fileOn,
                    opponentAdvocate,
                    totalFee,
                    userId: fetchuserid
                })
            });

            if (response.ok) {
                alert('Client added successfully!');
                navigate('/clientslist'); // Redirect to client list page
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Could not add client.'}`);
            }
        } catch (error) {
            console.error('Error adding client:', error);
            alert('An error occurred while adding the client.');
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5">
            <h2>Add New Client</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Client Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Second Party Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={secondPartyName}
                            onChange={(e) => setSecondPartyName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Mobile</label>
                        <input
                            type="text"
                            className="form-control"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Judge</label>
                        <select
                            className="form-select"
                            value={judge}
                            onChange={(e) => setJudge(e.target.value)}
                            required
                        >
                            <option value="">Select Judge</option>
                            {judges.map(j => (
                                <option key={j._id} value={j._id}>
                                    {j.judgeName} - {j.courtName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Client Type</label>
                        <select
                            className="form-select"
                            value={clientType}
                            onChange={(e) => setClientType(e.target.value)}
                            required
                        >
                            <option value="">Select Client Type</option>
                            {clientTypes.map(ct => (
                                <option key={ct._id} value={ct._id}>
                                    {ct.clientType}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Case Type</label>
                        <select
                            className="form-select"
                            value={caseType}
                            onChange={(e) => setCaseType(e.target.value)}
                            required
                        >
                            <option value="">Select Case Type</option>
                            {caseTypes.map(ct => (
                                <option key={ct._id} value={ct._id}>
                                    {ct.caseType}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">File On</label>
                        <input
                            type="date"
                            className="form-control"
                            value={fileOn}
                            onChange={(e) => setFileOn(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Filing No</label>
                        <input
                            type="text"
                            className="form-control"
                            value={filingNo}
                            onChange={(e) => setFilingNo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Case No</label>
                        <input
                            type="text"
                            className="form-control"
                            value={caseNo}
                            onChange={(e) => setCaseNo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">FIR No</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firNo}
                            onChange={(e) => setFirNo(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">FIR Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={firDate}
                            onChange={(e) => setFirDate(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Police Station</label>
                        <input
                            type="text"
                            className="form-control"
                            value={policeStation}
                            onChange={(e) => setPoliceStation(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Address</label>
                        <textarea
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Opponent Advocate</label>
                        <input
                            type="text"
                            className="form-control"
                            value={opponentAdvocate}
                            onChange={(e) => setOpponentAdvocate(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 col-md-6 col-lg-4">
                        <label className="form-label">Total Fee</label>
                        <input
                            type="number"
                            className="form-control"
                            value={totalFee}
                            onChange={(e) => setTotalFee(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </div></form>
        </div>
        </>
    );
};

export default Client;
