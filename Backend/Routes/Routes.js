const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/Controllers');

// book routes
router.get('/home', controllers.getBook);
router.get('/home/:pageNumber', controllers.getPage);

// comment routes
router.get('/comments/:bookId', controllers.getComments);
router.post('/comments/:bookId', controllers.addComment);
router.put('/comments/:commentId', controllers.updateComment);
router.delete('/comments/:commentId', controllers.deleteComment);

// user routes
router.post('/login', controllers.login);
router.post('/logout', controllers.logout);
router.post('/register', controllers.register);

module.exports = router;
