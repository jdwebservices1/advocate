const express = require('express');
const router = express.Router();
const momentTimezone = require('moment-timezone');
const moment = require('moment');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwrsecret = "MYNameisJashandeepSInghjoharmukts"
const bcrypt = require("bcryptjs");
const Client = require('../models/Client')
const Judge = require('../models/Judge')
const JudgeType = require('../models/JudgeType')
const ClientType = require('../models/ClientType')
const CaseType = require('../models/CaseType')
const User = require('../models/User')
const Document = require('../models/Document')
const Payment = require('../models/Payment')
const cloudinary = require('../config/cloudinary');
require('dotenv').config();
const authenticateJWT = require('./authMiddleware')
const mongoose = require('mongoose');

const crypto = require('crypto');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// Multer setup to handle file uploads
const storage = multer.diskStorage({}); // No local storage, directly use Cloudinary
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        // Accept only jpg, png, and pdf
        const fileTypes = /jpeg|jpg|png|pdf/;
        const extName = fileTypes.test(file.mimetype);
        
        if (extName) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpg, .png, or .pdf files are allowed!'));
        }
    }
});


// Create new client
router.post('/clients', authenticateJWT, async (req, res) => {
    try {
        const client = new Client({ ...req.body, userId: req.user._id }); // Associate client with user
        await client.save();
        res.status(201).json(client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all clients for the authenticated user
router.get('/clients', authenticateJWT, async (req, res) => {
    try {
        const clients = await Client.find({ userId: req.user._id }).populate('judge clientType caseType assignedCase');
        res.json(clients);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update client
router.put('/clients/:id', authenticateJWT, async (req, res) => {
    try {
        const client = await Client.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a specific client by ID
router.get('/clients/:id', authenticateJWT, async (req, res) => {
    try {
        const client = await Client.findOne({ _id: req.params.id, userId: req.user._id }).populate('judge clientType caseType assignedCase');
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json(client);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete client
router.delete('/clients/:id', authenticateJWT, async (req, res) => {
    try {
        const client = await Client.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.json({ message: 'Client deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to update case status and maintain history  -- Pending
router.put('/updateStatus/:id', authenticateJWT, async (req, res) => {
    try {
        const { status, statusDate, statusComment } = req.body;

        // Validate that status is provided
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }

        // Find the case by its ID
        const clientCase = await Client.findOne({ _id: req.params.id, userId: req.user._id });

        if (!clientCase) {
            return res.status(404).json({ message: 'Case not found' });
        }

        // Add the current status to statusHistory before updating
        if (clientCase.status) {
            clientCase.statusHistory.push({
                status: clientCase.status,
                statusDate: clientCase.statusDate || new Date(), // Use current date if not previously set
                statusComment: clientCase.statusComment
            });
        }

        // Update the current status, statusDate, and statusComment
        clientCase.status = status;
        clientCase.statusDate = statusDate || new Date(); // Default to current date if not provided
        clientCase.statusComment = statusComment;

        // Save the updated case with the status history
        await clientCase.save();

        res.json({ message: 'Case status updated successfully with history', clientCase });

    } catch (err) {
        // Handle any errors
        res.status(500).json({ error: err.message });
    }
});



// Create new judge
router.post('/judges', authenticateJWT, async (req, res) => {
    try {
        const judge = new Judge({ ...req.body, userId: req.user._id }); // Associate judge with user
        await judge.save();
        res.status(201).json(judge);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all judges for the authenticated user
router.get('/judges', authenticateJWT, async (req, res) => {
    try {
        const judges = await Judge.find({ userId: req.user._id });
        res.json(judges);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a specific judge by ID
router.get('/judges/:id', authenticateJWT, async (req, res) => {
    try {
        const judge = await Judge.findOne({ _id: req.params.id, userId: req.user._id });
        if (!judge) {
            return res.status(404).json({ message: 'Judge not found' });
        }
        res.json(judge);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update judge
router.put('/judges/:id', authenticateJWT, async (req, res) => {
    try {
        const judge = await Judge.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!judge) {
            return res.status(404).json({ message: 'Judge not found' });
        }
        res.json(judge);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete judge
router.delete('/judges/:id', authenticateJWT, async (req, res) => {
    try {
        const judge = await Judge.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!judge) {
            return res.status(404).json({ message: 'Judge not found' });
        }
        res.json({ message: 'Judge deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Search cases by judge name 
router.post('/searchByJudge', authenticateJWT, async (req, res) => {
    try {
        const { judgeName } = req.body; // Use request body for search

        // Ensure judge name is provided
        if (!judgeName) {
            return res.status(400).json({ error: 'Judge name is required' });
        }

        // Find all cases that match the specified judge name for the authenticated user
        const cases = await Client.find({
            judgeName: new RegExp(judgeName, 'i'), // Case-insensitive search
            userId: req.user._id // Ensure it's the authenticated user's case
        });

        // Check if cases were found
        if (cases.length === 0) {
            return res.status(404).json({ message: 'No cases found for this judge' });
        }

        // Return the found cases
        res.json(cases);

    } catch (err) {
        // Handle any errors
        res.status(500).json({ error: err.message });
    }
});


// Create new judge type
router.post('/judgetype', authenticateJWT, async (req, res) => {
    try {
        const judgeType = new JudgeType({ ...req.body, userId: req.user._id }); // Associate judge type with user
        await judgeType.save();
        res.status(201).json(judgeType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all judge types for the authenticated user
router.get('/judgetype', authenticateJWT, async (req, res) => {
    try {
        const judgeTypes = await JudgeType.find({ userId: req.user._id });
        res.json(judgeTypes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a specific judge type by ID
router.get('/judgetype/:id', authenticateJWT, async (req, res) => {
    try {
        const judgeType = await JudgeType.findOne({ _id: req.params.id, userId: req.user._id });
        if (!judgeType) {
            return res.status(404).json({ message: 'Judge type not found' });
        }
        res.json(judgeType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update judge type
router.put('/judgetype/:id', authenticateJWT, async (req, res) => {
    try {
        const judgeType = await JudgeType.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!judgeType) {
            return res.status(404).json({ message: 'Judge type not found' });
        }
        res.json(judgeType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete judge type
router.delete('/judgetype/:id', authenticateJWT, async (req, res) => {
    try {
        const judgeType = await JudgeType.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!judgeType) {
            return res.status(404).json({ message: 'Judge type not found' });
        }
        res.json({ message: 'Judge type deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create new case type
router.post('/casetype', authenticateJWT, async (req, res) => {
    try {
        const caseType = new CaseType({ ...req.body, userId: req.user._id }); // Associate case type with user
        await caseType.save();
        res.status(201).json(caseType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all case types for the authenticated user
router.get('/casetype', authenticateJWT, async (req, res) => {
    try {
        const caseTypes = await CaseType.find({ userId: req.user._id });
        res.json(caseTypes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update case type
router.put('/casetype/:id', authenticateJWT, async (req, res) => {
    try {
        const caseType = await CaseType.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!caseType) {
            return res.status(404).json({ message: 'Case type not found' });
        }
        res.json(caseType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/casetype/:id', async (req, res) => {
    try {
        await CaseType.findByIdAndDelete(req.params.id);
        res.json({ message: 'Case Type  deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete case type
router.delete('/casetype/:id', authenticateJWT, async (req, res) => {
    try {
        const caseType = await CaseType.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!caseType) {
            return res.status(404).json({ message: 'Case type not found' });
        }
        res.json({ message: 'Case type deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



// Create new client type
router.post('/clienttype', authenticateJWT, async (req, res) => {
    try {
        const clientType = new ClientType({ ...req.body, userId: req.user._id }); // Associate client type with user
        await clientType.save();
        res.status(201).json(clientType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all client types for the authenticated user
router.get('/clienttype', authenticateJWT, async (req, res) => {
    try {
        const clientTypes = await ClientType.find({ userId: req.user._id });
        res.json(clientTypes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a specific client type by ID
router.get('/clienttype/:id', authenticateJWT, async (req, res) => {
    try {
        const clientType = await ClientType.findOne({ _id: req.params.id, userId: req.user._id });
        if (!clientType) {
            return res.status(404).json({ message: 'Client type not found' });
        }
        res.json(clientType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update client type
router.put('/clienttype/:id', authenticateJWT, async (req, res) => {
    try {
        const clientType = await ClientType.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!clientType) {
            return res.status(404).json({ message: 'Client type not found' });
        }
        res.json(clientType);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete client type
router.delete('/clienttype/:id', authenticateJWT, async (req, res) => {
    try {
        const clientType = await ClientType.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!clientType) {
            return res.status(404).json({ message: 'Client type not found' });
        }
        res.json({ message: 'Client type deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/signup',
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('name').notEmpty().withMessage('Name is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password, name } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email id already exists' });
            }

            // Create a new user (no manual hashing required, schema handles it)
            const user = new User({
                email,
                password,  // Plain password, let schema handle hashing
                name,
            });

            await user.save();

            // Generate JWT token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
                token,
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }
);
router.post('/login', 
    // Validate user input
    [
        body('email').isEmail().withMessage('Enter a valid email'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
             // Debug: Check if email is being received correctly
             console.log('Email:', email);

            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) {
                // Generic message to avoid revealing if the email exists
                return res.status(400).json({ error: 'Invalid Email Address' });
            }
            // Debug: Check if user is retrieved correctly
            console.log('User found:', user);
           
            
            // Compare the provided password with the hashed password stored in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                console.log('Provided Password:', password);  // Plain-text password from the user
                console.log('Stored Hashed Password:', user.password);  // Hashed password from DB
                console.log('Password comparison failed');
                return res.status(400).json({ error: 'Password not matched' });
            } else {
                console.log('Password matched!');
            }

            // Debug: Check if the password comparison passes
            console.log(isMatch,'Password matched!');

            // Generate JWT token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Generated token:', token); // Log the generated token
            // Respond with the user data and token
            res.status(200).json({
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
                token,
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Server error' });
        }
    }
);



// Route to search cases by date
router.post('/searchByDate', authenticateJWT, async (req, res) => {
    try {
        const { date } = req.body;

        if (!date) {
            return res.status(400).json({ error: 'Date is required' });
        }

        const [year, month, day] = date.split('-');
        const searchDate = new Date(`${year}-${month}-${day}`);

        // Adjust date query to match the entire day
        const startOfDay = new Date(searchDate.setUTCHours(0, 0, 0, 0)); // Start of the day
        const endOfDay = new Date(searchDate.setUTCHours(23, 59, 59, 999)); // End of the day

        const cases = await Client.find({
            statusDate: {
                $gte: startOfDay,
                $lt: endOfDay
            },
            userId: req.user._id // Ensure the case belongs to the logged-in user
        });

        if (cases.length === 0) {
            return res.status(404).json({ message: 'No cases found for this date' });
        }

        res.json(cases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Route to search cases by month and year
router.post('/searchByMonthYear', authenticateJWT, async (req, res) => {
    try {
        const { month, year } = req.body;

        // Validate the month and year inputs
        if (!month || !year) {
            return res.status(400).json({ error: 'Month and year are required' });
        }

        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);

        // Check if month and year are valid
        if (isNaN(monthInt) || isNaN(yearInt) || monthInt < 1 || monthInt > 12) {
            return res.status(400).json({ error: 'Invalid month or year' });
        }

        // Create start and end dates for the query
        const startDate = new Date(Date.UTC(yearInt, monthInt - 1, 1)); // First day of the month in UTC
        const endDate = new Date(Date.UTC(yearInt, monthInt, 1)); // First day of the next month in UTC

        // Query cases that fall between the start and end dates
        const cases = await Client.find({
            statusDate: {
                $gte: startDate,
                $lt: endDate
            },
            userId: req.user._id // Ensure the case belongs to the logged-in user
        });

        if (cases.length === 0) {
            return res.status(404).json({ message: 'No cases found for this month and year' });
        }

        res.json(cases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/uploadDocument/:caseId', authenticateJWT, upload.single('document'), async (req, res) => {
    try {
        const { caseId } = req.params;

        const clientCase = await Client.findOne({ _id: caseId, userId: req.user._id }); // Ensure user owns the case
        if (!clientCase) {
            return res.status(404).json({ message: 'Case not found or access denied' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const fileType = req.file.mimetype.includes('image') ? 'image' : 'pdf';

        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: 'employeeApp',
            resource_type: fileType === 'pdf' ? 'raw' : 'image'
        });

        const newDocument = new Document({
            caseId,
            cloudinaryId: result.public_id,
            url: result.secure_url,
            fileType,
            userId: req.user._id // Track the user who uploaded the document
        });

        await newDocument.save();
        res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route to retrieve all documents for a case
router.get('/caseDocuments/:caseId', authenticateJWT, async (req, res) => {
    try {
        const { caseId } = req.params;

        const documents = await Document.find({ caseId, userId: req.user._id }); // Ensure documents belong to the logged-in user

        res.status(200).json({ documents });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Route to delete a document -  -- Pending
router.delete('/deleteDocument/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;

        const document = await Document.findOne({ _id: id, userId: req.user._id }); // Ensure document belongs to the logged-in user
        if (!document) {
            return res.status(404).json({ message: 'Document not found or access denied' });
        }

        await cloudinary.uploader.destroy(document.cloudinaryId);
        await document.remove();

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Payment 
router.post('/addPayment/:caseId', authenticateJWT, async (req, res) => {
    try {
        const { caseId } = req.params;
        const { amountPaid, paymentMethod, remarks } = req.body;

        // Validate that the case exists and belongs to the logged-in user
        const clientCase = await Client.findOne({ _id: caseId, userId: req.user._id });
        if (!clientCase) {
            return res.status(404).json({ message: 'Case not found or does not belong to the user.' });
        }

        // Check if totalFee is set
        if (!clientCase.totalFee || clientCase.totalFee <= 0) {
            return res.status(400).json({ message: 'Total fee for the case is not set. Cannot add payment.' });
        }

        // Calculate total payments already made
        const totalPayments = await Payment.aggregate([
            { $match: { caseId: mongoose.Types.ObjectId(caseId) } },
            { $group: { _id: null, totalPaid: { $sum: '$amountPaid' } } }
        ]);

        const totalPaid = totalPayments.length > 0 ? totalPayments[0].totalPaid : 0;
        const remainingBalance = clientCase.totalFee - totalPaid;

        // Validate the amount paid
        if (amountPaid <= 0) {
            return res.status(400).json({ message: 'Payment amount must be a positive number.' });
        }
        if (amountPaid > remainingBalance) {
            return res.status(400).json({ message: `Payment exceeds the remaining balance. Remaining balance is ${remainingBalance}` });
        }

        // Validate payment method
        const validPaymentMethods = ['cash', 'card', 'online', 'other'];
        if (!validPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({ message: 'Invalid payment method. Accepted values: cash, card, online, other.' });
        }

        // Create a new payment entry
        const newPayment = new Payment({
            caseId,
            amountPaid,
            paymentMethod,
            remarks,
            userId: req.user._id // Associate the payment with the user
        });

        // Save the payment in the database
        await newPayment.save();

        res.status(201).json({ message: 'Payment added successfully', payment: newPayment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get all payments for a specific case  
router.get('/casePayments/:caseId', authenticateJWT, async (req, res) => {
    try {
        const { caseId } = req.params;

        // Fetch payments related to the case, ensuring it belongs to the user
        const payments = await Payment.find({ caseId, userId: req.user._id });

        res.status(200).json({ payments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to calculate total payments and remaining balance for a specific case -  -- Pending
router.get('/caseBalance/:caseId', authenticateJWT, async (req, res) => {
    try {
        const { caseId } = req.params;

        // Get the case details, ensuring it belongs to the user
        const clientCase = await Client.findOne({ _id: caseId, userId: req.user._id });
        if (!clientCase) {
            return res.status(404).json({ message: 'Case not found or does not belong to the user.' });
        }

        // Aggregate total payments made for the case
        const totalPayments = await Payment.aggregate([
            { $match: { caseId: mongoose.Types.ObjectId(caseId) } },
            { $group: { _id: null, totalPaid: { $sum: '$amountPaid' } } }
        ]);

        const totalPaid = totalPayments.length > 0 ? totalPayments[0].totalPaid : 0;
        const remainingBalance = clientCase.totalFee - totalPaid;

        res.status(200).json({
            totalFee: clientCase.totalFee,
            totalPaid,
            remainingBalance
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upcoming cases for the next 7 days from today  
router.get('/upcomingCases', authenticateJWT, async (req, res) => {
    try {
        const today = new Date();
        const sevenDaysLater = new Date();
        sevenDaysLater.setDate(today.getDate() + 7);

        // Fetch cases where the next statusDate is within the next 7 days
        const upcomingCases = await Client.find({
            userId: req.user._id, // Fetch only the cases that belong to the logged-in user
            statusDate: { $gte: today, $lte: sevenDaysLater }
        });

        res.status(200).json({ upcomingCases });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get today's cases  
router.get('/todayCases', authenticateJWT, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today
        const endOfToday = new Date(today);
        endOfToday.setHours(23, 59, 59, 999); // End of today

        // Fetch cases where the statusDate is today
        const todayCases = await Client.find({
            userId: req.user._id, // Ensure it belongs to the user
            statusDate: { $gte: today, $lte: endOfToday }
        });

        res.status(200).json({ todayCases });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API to get tomorrow's cases  
router.get('/tomorrowCases', authenticateJWT, async (req, res) => {
    try {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // Start of tomorrow

        const endOfTomorrow = new Date(tomorrow);
        endOfTomorrow.setHours(23, 59, 59, 999); // End of tomorrow

        // Fetch cases where the statusDate is tomorrow
        const tomorrowCases = await Client.find({
            userId: req.user._id, // Ensure it belongs to the user
            statusDate: { $gte: tomorrow, $lte: endOfTomorrow }
        });

        res.status(200).json({ tomorrowCases });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




module.exports = router;



