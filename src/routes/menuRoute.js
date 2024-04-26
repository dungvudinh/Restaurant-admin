const express = require('express');
const router = express.Router();
const menuController = require('../app/controllers/MenuController');
const uploadCloud = require('../config/cloudinary.config');

router.post('/food/new', uploadCloud.array('imgPath', 4),menuController.newFood);
router.get('/food/food-group', menuController.foodMenu)
// router.get('/food', menuController.foodMenu);
router.get('/drink', menuController.drinkMenu);

module.exports = router;