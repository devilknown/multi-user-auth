const router = require('express').Router();
const authController = require('../../controllers/authController');

router.get('/signup', authController);

module.exports = router;