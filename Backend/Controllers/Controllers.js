const Comment = require('../Models/Comment');
const User = require('../Models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const salt_rounds = +process.env.salt_rounds;
const private_key = process.env.JWT_PRIVATE_KEY;




// Get book content for a specific page
exports.getBookPage = async (req, res) => {
  const pdfjs = await import('pdfjs-dist');
  const { pageNumber } = req.params;
  const pdfPath = 'book.pdf'; 
  try {
      const pdfDoc = await pdfjs.PDFDocument.load(pdfPath);
      const numPages = pdfDoc.numPages;

      // Check if the page exists
      if (pageNumber > numPages || pageNumber < 1) {
          return res.status(404).json({ error: 'Page not found' });
      }

      const page = await pdfDoc.getPage(pageNumber - 1);
      const text = await page.getTextContent();
      const content = text.items.map(item => item.str).join('');
      res.json({ content });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Get currentUser info 
exports.getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
};


// Get comments for a specific page
exports.getComments = async (req, res) => {
  try {
      const comments = await Comment.find()
          .populate('user', 'username') 
          .sort({ timestamp: -1 }); 
      res.json(comments);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


// Add a new comment
exports.addComment = async (req, res) => {
  const { pageNumber, content } = req.body;
  try {
      const userId = req.user.id; 

      const newComment = new Comment({
          user: userId,
          pageNumber,
          content,
      });
      const savedComment = await newComment.save();
      res.json(savedComment);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};




// User registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt_rounds);
    const newUser = new User({ username, password: hashedPassword });

    // Save user
    await newUser.save();
    res.json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate token
    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, private_key, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};