const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.post('/room-table/area/new', siteController.newArea);
router.post('/room-table/update', siteController.updateRoomTable)
router.post('/room-table/new', siteController.newRoomTable);
router.get('/room-table/history',siteController.tableHistory);
router.get('/room-table/filter', siteController.filterData)
router.get('/room-table', siteController.roomTable);
router.get('/', siteController.dashboard);

module.exports = router;