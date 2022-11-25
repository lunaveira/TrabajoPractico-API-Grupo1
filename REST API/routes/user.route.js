var express = require('express')
var router = express.Router()
var UserController = require('../controllers/users.controller');


router.post('/signup', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/forogoPassword/', UserController.forgotPassword);




// Export the Router
module.exports = router;