const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  ticketPrice: {
    type: Number,
    required: true
  },
  totalTickets: {
    type: Number,
    required: true
  },
  availableTickets: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['Concert', 'Sports', 'Theater', 'Conference', 'Other']
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
