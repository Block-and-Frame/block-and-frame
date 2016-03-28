const express = require('express');
const instaController = require('./instaController');


const router = express.Router();


router.post('/getUserPics', instaController.getUserPics);


module.exports = router;
