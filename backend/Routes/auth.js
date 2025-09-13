const express = require('express');
const User = require('./Models/User'); // Adjust the path based on your project structure
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.json({ success: true, jwtToken: token, message: 'Login successful' });
});

module.exports = router;
