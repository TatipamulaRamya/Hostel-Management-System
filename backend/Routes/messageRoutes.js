const express = require('express');
const router = express.Router();
const Message = require('../Models/Message');

// GET all messages
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
});

// POST a new message
router.post('/', async (req, res) => {
    const { userId, text, time } = req.body;

    const newMessage = new Message({ userId, text, time });

    try {
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

module.exports = router;
