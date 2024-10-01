const mongoose = require('mongoose');

const judgeSchema = new mongoose.Schema({
    courtCode: { type: String, required: true },
    buildingNo: { type: String, required: true },
    floorNo: { type: String, required: true },
    roomNo: { type: String, required: true },
    subRoom: { type: String },
    courtName: { type: String, required: true },
    judgeName: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    policeStation: { type: String },
    place: { type: String },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to User model 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Judge', judgeSchema);
