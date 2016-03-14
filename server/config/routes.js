var express = require('express');
var userRoutes = require('../users/userRoutes');
var router = express.Router();

router.use('/users', userRoutes);
// events

module.exports = router;
