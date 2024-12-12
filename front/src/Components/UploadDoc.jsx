import React, { useState } from 'react';

const UploadDocuments = ({ caseId, token }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [error, setError] = useState('');

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setError('Please select a file.');
            return;
        }

        // Validate file type (accept PDF and images)
        if (!file.type.includes('image') && !file.type.includes('pdf')) {
            setError('Invalid file type. Please upload an image or PDF file.');
            return;
        }

        setSelectedFile(file);
        setError('');
    };

    // Handle file upload
    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setError('No file selected for upload.');
            return;
        }
        

        const formData = new FormData();
        formData.append('document', selectedFile);

        try {
            const response = await fetch(`https://advocate-q881.onrender.com/api/uploadDocument/${caseId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadStatus('Document uploaded successfully!');
                setSelectedFile(null);
                setError('');
            } else {
                setError(data.message || 'Failed to upload document.');
            }
        } catch (err) {
            setError('An error occurred while uploading the document.');
        }
    };

    return (
        <div className="container mt-4">
              <h2 className='pb-5'>Upload Document</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {uploadStatus && <div className="alert alert-success">{uploadStatus}</div>}

            <form onSubmit={handleUpload}>
                <div className="mb-3">
                    <label htmlFor="document" className="form-label">
                        Select Document (PDF or Image)
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="document"
                        onChange={handleFileChange}
                        accept="application/pdf,image/*"
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={!selectedFile}>
                    Upload Document
                </button>
            </form>
        </div>
    );
};

export default UploadDocuments;
