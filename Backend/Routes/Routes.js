const express = require('express');
const {
    getBookPage,
    getComments,
    addComment,
    login,
    register,
    getMe
} = require('../Controllers/Controllers');
const auth = require('../Middleware/auth');

const router = express.Router();

// Book content route
router.get('/book/:pageNumber', getBookPage);

// Get currentUser info route
router.get('/api/me', auth, getMe)

// Comment routes
router.get('/comments/', getComments);
router.post('/comments', auth, addComment); 

// Auth routes
router.post('/login', login);
router.post('/register', register);

module.exports = router;
