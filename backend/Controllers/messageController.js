const Message = require('../Models/Message');

// Get all messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json({ messages });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};

// Post a new message
exports.postMessage = async (req, res) => {
    const { userId, text, time } = req.body;

    try {
        const newMessage = new Message({ userId, text, time });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message' });
    }
};
