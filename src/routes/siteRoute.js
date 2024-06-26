const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/room-table/export-file', siteController.exportFile);
router.post('/employee/update-status', siteController.updateStatusEmployee)
router.get('/employee/filter', siteController.filterEmployee);
router.get('/employee', siteController.employee);
router.post('/order-status/:app_trans_id', siteController.orderStatus);
router.post('/callback', siteController.callback);
router.post('/payment', siteController.payment);
router.post('/room-table/area/new',siteController.verifyAccount, siteController.newArea);
router.post('/room-table/update-status', siteController.verifyAccount, siteController.updateStatusTable);
router.post('/room-table/update', siteController.verifyAccount,siteController.updateRoomTable)
router.post('/room-table/new', siteController.verifyAccount,siteController.newRoomTable);
router.get('/room-table/history',siteController.verifyAccount,siteController.tableHistory);
router.get('/room-table/filter',siteController.verifyAccount, siteController.filterData)
router.get('/room-table/delete', siteController.verifyAccount, siteController.deleteTable)
router.get('/room-table',siteController.verifyAccount,  siteController.roomTable);
router.get('/signup', siteController.signup);
router.get('/login', siteController.login);
router.get('/logout', siteController.logout);
router.get('/',siteController.verifyAccount,  siteController.dashboard);

module.exports = router;