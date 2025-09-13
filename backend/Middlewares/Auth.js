
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if the authorization header is present
    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1]; // Assumes "Bearer <token>"

    if (!token) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is missing' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Call the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is wrong or expired' });
    }
}

module.exports = ensureAuthenticated;
