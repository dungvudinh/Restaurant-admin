const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/room-table', siteController.roomTable);
router.get('/', siteController.dashboard);

module.exports = router;