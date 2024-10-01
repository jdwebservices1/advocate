const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    caseNo: { type: String, required: true },
    filingNo: { type: String, required: true },
    judge: { type: mongoose.Schema.Types.ObjectId, ref: 'Judge', required: true },
    caseType: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseType', required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    status: { type: String, enum: ['Pending', 'Decided', 'Sinedie'], default: 'Pending' },
    hearingDate: { type: Date, required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
