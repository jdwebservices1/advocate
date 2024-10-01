const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the Client (case)
        required: true
    },

    cloudinaryId: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        enum: ['image', 'pdf'], // Specify file type (image or PDF)
        required: true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);
