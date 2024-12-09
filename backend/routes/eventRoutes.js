// backend/routes/eventRoutes.js
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
