import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const UploadDocumentsList = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const caseId = id; 
    const token = localStorage.getItem('token'); // Get token from local storage

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
               
               
                const response = await fetch(`http://localhost:3001/api/caseDocuments/${caseId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch documents');
                }

                const data = await response.json();
                console.log(data, "Data");
                
                setDocuments(data.documents);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [caseId, token]);

    if (loading) {
        return <div>Loading documents...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!documents.length) {
        return <div>No documents found for this case.</div>;
    }

    return (
        <>
        <Navbar />
        <div className="container py-5">
            <h2>Documents for Case ID: {caseId}</h2>
            <ul className="list-group">
                {documents.map((document) => (
                    <li key={document._id} className="list-group-item">
                        <p><strong>File Type:</strong> {document.fileType}</p>
                        <p><strong>URL:</strong> <a href={document.url} target="_blank" rel="noopener noreferrer">View Document</a></p>
                        <p><strong>Uploaded At:</strong> {new Date(document.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default UploadDocumentsList;
