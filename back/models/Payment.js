const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    caseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client', // Reference to the Client (case)
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ['cash', 'card', 'online', 'other'],
        required: true
    },
    remarks: {
        type: String
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
