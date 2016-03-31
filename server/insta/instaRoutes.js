const router = require('express').Router();
const instaController = require('./instaController');

router.post('/getUserPics', instaController.getUserPics);
router.post('/getUniqueTagPics', instaController.getUniqueTagPics);

module.exports = router;
