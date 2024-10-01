const mongoose = require('mongoose');

const statusHistorySchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Pending', 'Decided', 'Sine Die'], // Add more statuses if necessary
        required: true
    },
    statusDate: {
        type: Date,
        default: Date.now
    },
    statusComment: {
        type: String
    }
}, { _id: false });

const clientSchema = new mongoose.Schema({
    sNo: Number,
    clientName: { type: String, required: true },
    secondPartyName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    judge: { type: mongoose.Schema.Types.ObjectId, ref: 'Judge', required: true },
    clientType: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientType', required: true },
    caseType: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseType', required: true },
    fileOn: { type: Date, required: true },
    filingNo: { type: String, required: true },
    caseNo: { type: String, required: true },
    firNo: { type: String },
    firDate: { type: Date },
    policeStation: { type: String },
    description: { type: String },
    address: { type: String },
    opponentAdvocate: { type: String },
    assignedCase: {type: String },

    totalFee: {
        type: Number,
        required: true // Total fee for the case
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model 
        required: true 
    },
    // Current status
    status: {
        type: String,
        enum: ['Pending', 'Decided', 'Sine Die'],
        default: 'Pending'
    },
    statusDate: {
        type: Date
    },
    statusComment: {
        type: String
    },

    // New field to store the history of status changes
    statusHistory: [statusHistorySchema]  // Array to store status history
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
