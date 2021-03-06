const express = require('express');
const eventController = require('./eventController');

const router = express.Router();

// Event CRUD
router.get('/', eventController.getAllEvents);
router.get('/:eventId', eventController.getEventbyId);
router.post('/', eventController.createEvent);
router.put('/:eventId', eventController.editEvent);
router.put('/join/:eventId', eventController.joinEvent);
router.delete('/:eventId', eventController.deleteEvent);

// Event comments
router.get('/:eventId/comments', eventController.getComments);
router.post('/:eventId/comments', eventController.addComment);

module.exports = router;
