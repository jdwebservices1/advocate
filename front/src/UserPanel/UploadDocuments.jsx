// Example of how to use the component

import React from 'react';
import UploadDocuments from '../Components/UploadDoc';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';


const CaseDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const caseId = id; 
    const token = localStorage.getItem('token'); // Get token from local storage
    const userID = localStorage.getItem('userID'); // Get token from local storage

    return (
        <>
          <Navbar />
            <UploadDocuments caseId={caseId} token={token} userId={userID} />
        </>
    );
};

export default CaseDetails;
