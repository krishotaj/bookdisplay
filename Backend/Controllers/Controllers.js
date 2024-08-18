const User = require('../Models/User');
const Book = require('../Models/Book');
const Comment = require('../Models/Comment');


// book controller//


exports.getBook = async (req, res) => {
    try {
      const book = await Book.findOne();
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting book' });
    }
  };
  
  exports.getPage = async (req, res) => {
    try {
      const book = await Book.findOne();
      const pageNumber = req.params.pageNumber;
      const page = book.pages.find((page) => page.pageNumber === parseInt(pageNumber));
      res.json(page);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting page' });
    }
  };
  
  // comment controller //


  //get comments
  exports.getComments = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const comments = await Comment.find({ bookId });
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting comments' });
    }
  };
  
  //add comment
  exports.addComment = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const userId = req.user.id;
      const comment = new Comment({ content: req.body.content, userId, bookId });
      await comment.save();
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error adding comment' });
    }
  };


  //edit comment
  exports.updateComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const comment = await Comment.findByIdAndUpdate(commentId, { content: req.body.content }, { new: true });
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating comment' });
    }
  };


  //delete comment
  exports.deleteComment = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      await Comment.findByIdAndRemove(commentId);
      res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting comment' });
    }
  };
  
  // user controller//

  //login
  exports.login = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const isValid = await user.comparePassword(req.body.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      req.session.userId = user.id;
      res.json({ message: 'Logged in successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging in' });
    }
  };
  
  //logout
  exports.logout = async (req, res) => {
    try {
      req.session.destroy();
      res.json({ message: 'Logged out successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging out' });
    }
  };


  //register
  exports.register = async (req, res) => {
    try {
      const user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
      await user.save();
      res.json({ message: 'User created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    }
  };