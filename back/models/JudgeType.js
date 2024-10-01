const mongoose = require('mongoose');

const judgeTypeSchema = new mongoose.Schema({
    judgeType: { type: String, required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('JudgeType', judgeTypeSchema);
