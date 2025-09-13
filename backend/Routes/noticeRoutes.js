const express = require('express');
const router = express.Router();
const Notice = require('../Models/Notice');

// GET all notices
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json({ notices });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch notices' });
    }
});

// POST a new notice
router.post('/', async (req, res) => {
    const { title, message, time } = req.body;

    const newNotice = new Notice({ title, message, time });

    try {
        await newNotice.save();
        res.status(201).json(newNotice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to post notice' });
    }
});

module.exports = router;
