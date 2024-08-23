
const jwt = require('jsonwebtoken');
require('dotenv').config();

const private_key = process.env.JWT_PRIVATE_KEY; 

if (!private_key) {
    console.error('JWT private key is not defined');
    process.exit(1);
}

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

    const token = authHeader.split(' ')[1]; 
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, private_key);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;