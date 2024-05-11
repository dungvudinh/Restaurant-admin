const express = require('express');
const router = express.Router();
const accountController = require('../app/controllers/AccountController');

router.post('/register', accountController.register);
router.post('/authentication',  accountController.authentication);

module.exports = router;