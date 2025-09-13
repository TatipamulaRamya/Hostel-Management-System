const Notice = require('../Models/Notice');

// Get all notices
exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.json({ notices });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notices' });
    }
};

// Post a new notice
exports.postNotice = async (req, res) => {
    const { title, message, time } = req.body;

    try {
        const newNotice = new Notice({ title, message, time });
        await newNotice.save();
        res.status(201).json({ message: 'Notice posted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to post notice' });
    }
};
