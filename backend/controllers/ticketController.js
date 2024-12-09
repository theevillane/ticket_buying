const Ticket = require('../models/Ticket');
const Event = require('../models/Event');

exports.purchaseTicket = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { eventId, userId, quantity } = req.body;

    // Find the event
    const event = await Event.findById(eventId).session(session);
    if (!event) {
      throw new Error('Event not found');
    }

    // Check ticket availability
    if (event.availableTickets < quantity) {
      throw new Error('Not enough tickets available');
    }

    // Create ticket
    const ticket = new Ticket({
      event: eventId,
      user: userId,
      quantity,
      totalPrice: event.ticketPrice * quantity
    });

    // Save ticket
    await ticket.save({ session });

    // Update event tickets
    event.availableTickets -= quantity;
    await event.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json(ticket);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};
