const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.post('/room-table/area/new', siteController.newArea);
router.get('/room-table/filter', siteController.filterData)
router.get('/room-table', siteController.roomTable);
router.get('/search', siteController.search);
router.get('/', siteController.dashboard);

module.exports = router;