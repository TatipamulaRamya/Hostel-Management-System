const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = verifyAdmin;
