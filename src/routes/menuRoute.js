const express = require('express');
const router = express.Router();
const menuController = require('../app/controllers/MenuController');
const uploadCloud = require('../config/cloudinary.config');

router.get('/food/restore', menuController.restoreFood);
router.get('/food/delete-perm', menuController.deletePerm);
router.get('/food/bin', menuController.binFood);
router.post('/food/delete', menuController.deleteFood);
router.post('/food/update-status',menuController.updateStatusFood);
router.post('/food/update', uploadCloud.array('imgPath', 4),menuController.updateFood);
router.post('/food/new', uploadCloud.array('imgPath', 4),menuController.newFood);
router.get('/food/filter', menuController.filterData);
router.get('/food', menuController.foodMenu)

router.get('/drink/restore', menuController.restoreDrink);
router.get('/drink/delete-perm', menuController.deletePermDrink);
router.get('/drink/bin',menuController.binDrink);
router.post('/drink/delete',menuController.deleteDrink);
router.post('/drink/update-status',menuController.updateStatusDrink);
router.post('/drink/update', uploadCloud.array('imgPath', 4),menuController.updateDrink);
router.post('/drink/new', uploadCloud.array('imgPath', 4),menuController.newDrink);
router.get('/drink/filter', menuController.drinkFilterData);
router.get('/drink', menuController.drinkMenu);

module.exports = router;