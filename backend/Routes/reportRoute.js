const express = require('express');
const router = express.Router();
const Report = require('../Models/Report');

router.post('/api/reports', async (req, res) => {
    try {
        const { text } = req.body;
        const newReport = new Report({ text });
        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully' });
    } catch (error) {
        console.error('Error saving report to database:', error);
        res.status(500).json({ message: 'Failed to submit report' });
    }
});

module.exports = router;
