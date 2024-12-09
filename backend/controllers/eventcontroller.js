const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeaturedEvents = async (req, res) => {
  try {
    const featuredEvents = await Event.find()
      .sort({ date: 1 })
      .limit(6);
    res.json(featuredEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
