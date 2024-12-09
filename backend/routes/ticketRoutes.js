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