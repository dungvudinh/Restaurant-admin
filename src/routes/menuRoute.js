const express = require('express');
const router = express.Router();
const menuController = require('../app/controllers/MenuController');

router.get('/food', menuController.foodMenu);
router.get('/drink', menuController.drinkMenu);

module.exports = router;