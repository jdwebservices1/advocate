import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ClientUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // State for form fields (same as Client.jsx)
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

    // Fetch client details to edit
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/clients/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();

                // Set fields with existing client data
                setClientName(data.clientName);
                setSecondPartyName(data.secondPartyName);
                setMobile(data.mobile);
                setEmail(data.email);
                setJudge(data.judge);
                setClientType(data.clientType);
                setCaseType(data.caseType);
                setFileOn(data.fileOn);
                setFilingNo(data.filingNo);
                setCaseNo(data.caseNo);
                setFirNo(data.firNo);
                setFirDate(data.firDate);
                setPoliceStation(data.policeStation);
                setDescription(data.description);
                setAddress(data.address);
                setOpponentAdvocate(data.opponentAdvocate);
                setTotalFee(data.totalFee);
            } catch (error) {
                console.error('Error fetching client:', error);
            }
        };

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

        fetchClient();
        fetchDropdownData();
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/api/clients/${id}`, {
                method: 'PUT',
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
                    opponentAdvocate,
                    totalFee
                })
            });

            if (response.ok) {
                alert('Client updated successfully!');
                navigate('/clientlist');
            } else {
                const data = await response.json();
                alert(`Error: ${data.error || 'Could not update client.'}`);
            }
        } catch (error) {
            console.error('Error updating client:', error);
            alert('An error occurred while updating the client.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Client</h2>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    {/* Form fields similar to Client.jsx */}
                    
                    <div className="mb-3 col-lg-4 col-md-6">
                        <label className="form-label">Client Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Second Party Name */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Second Party Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={secondPartyName}
                    onChange={(e) => setSecondPartyName(e.target.value)}
                    required
                />
            </div>

            {/* Mobile */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Mobile</label>
                <input
                    type="text"
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />
            </div>

            {/* Email */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {/* Judge */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Judge</label>
                <select
                    className="form-control"
                    value={judge}
                    onChange={(e) => setJudge(e.target.value)}
                    required
                >
                    <option value="">Select Judge</option>
                    {judges.map((judge) => (
                        <option key={judge._id} value={judge._id}>
                            {judge.judgeName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Client Type */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Client Type</label>
                <select
                    className="form-control"
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    required
                >
                    <option value="">Select Client Type</option>
                    {clientTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                            {type.clientType}
                        </option>
                    ))}
                </select>
            </div>

            {/* Case Type */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Case Type</label>
                <select
                    className="form-control"
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    required
                >
                    <option value="">Select Case Type</option>
                    {caseTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                            {type.caseType}
                        </option>
                    ))}
                </select>
            </div>

            {/* File On */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">File On</label>
                <input
                    type="date"
                    className="form-control"
                    value={fileOn}
                    onChange={(e) => setFileOn(e.target.value)}
                    required
                />
            </div>

            {/* Filing No */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Filing No</label>
                <input
                    type="text"
                    className="form-control"
                    value={filingNo}
                    onChange={(e) => setFilingNo(e.target.value)}
                    required
                />
            </div>

            {/* Case No */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Case No</label>
                <input
                    type="text"
                    className="form-control"
                    value={caseNo}
                    onChange={(e) => setCaseNo(e.target.value)}
                    required
                />
            </div>

            {/* FIR No */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">FIR No</label>
                <input
                    type="text"
                    className="form-control"
                    value={firNo}
                    onChange={(e) => setFirNo(e.target.value)}
                />
            </div>

            {/* FIR Date */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">FIR Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={firDate}
                    onChange={(e) => setFirDate(e.target.value)}
                />
            </div>

            {/* Police Station */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Police Station</label>
                <input
                    type="text"
                    className="form-control"
                    value={policeStation}
                    onChange={(e) => setPoliceStation(e.target.value)}
                />
            </div>

            {/* Description */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Description</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {/* Address */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Address</label>
                <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>

            {/* Opponent Advocate */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Opponent Advocate</label>
                <input
                    type="text"
                    className="form-control"
                    value={opponentAdvocate}
                    onChange={(e) => setOpponentAdvocate(e.target.value)}
                />
            </div>

            {/* Total Fee */}
            <div className="mb-3 col-lg-4 col-md-6">
                <label className="form-label">Total Fee</label>
                <input
                    type="number"
                    className="form-control"
                    value={totalFee}
                    onChange={(e) => setTotalFee(e.target.value)}
                    required
                />
            </div>

                </div>
                {/* Other form fields same as in Client.jsx */}
                {/* Submit button */}
                <button type="submit" className="btn btn-primary">Update Client</button>
            </form>
        </div>
    );
};

export default ClientUpdate;
