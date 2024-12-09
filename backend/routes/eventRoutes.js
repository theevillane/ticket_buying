const express = require('express');
const router = express.Router();
const { 
  createEvent, 
  getAllEvents, 
  getFeaturedEvents 
} = require('../controllers/eventController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.requireAdmin, createEvent);
router.get('/', getAllEvents);
router.get('/featured', getFeaturedEvents);

module.exports = router;

// backend/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const { purchaseTicket } = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/purchase', 
  authMiddleware.requireAuth, 
  purchaseTicket
);

module.exports = router;

// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser 
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;

// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

exports.requireAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};