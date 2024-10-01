const mongoose = require('mongoose');

const caseTypeSchema = new mongoose.Schema({
    caseType: { type: String, required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('CaseType', caseTypeSchema);
