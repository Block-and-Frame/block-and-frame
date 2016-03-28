const express = require('express');
const eventRoutes = require('./events/eventRoutes');
const userRoutes = require('./users/userRoutes');
const instaRoutes = require('./insta/instaRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/insta', instaRoutes);


module.exports = router;
