const express = require('express');
const router = express.Router();
const apiController = require('../app/controllers/APIController');
const uploadCloud = require('../config/cloudinary.config');


//client  

router.post('/booking/new-from-client',apiController.newBookingFromClient);
router.post('/client/new-from-client',apiController.newClientFromClient);
router.get('/menu/client', apiController.getListMenuClient);
//cashier 
router.get('/order/')
router.put('/booking/update-status', apiController.updateBookingStatus);
router.put('/order/update-status', apiController.updateOrderStatus);
router.put('/order/update-note', apiController.updateOrderNote)
router.delete('/order/delete', apiController.deleteOrder);
router.put('/table/update-status', apiController.updateTableStatus)
router.post('/order/new', apiController.insertOrder);
router.get('/order/last_order_id', apiController.getLastIdOrder);
router.delete('/order/delete-menu', apiController.deleteOrderMenu);
router.put('/order/update-other', apiController.updateOther);
router.put('/order/update-quantity', apiController.updateOrderQuantity);
router.put('/order/update', apiController.updateOrder);
router.get('/order', apiController.getListOrder);
router.post('/menu/new',uploadCloud.array('img_path', 4),  apiController.insertMenu);
router.get('/menu', apiController.getListMenu);
router.get('/menu_group', apiController.getListMenuGroup);
router.put('/table/update', apiController.updateTable);
//reception
router.delete('/order/delete-by-booking', apiController.deleteOrderByBooking);
router.put('/booking/cancel', apiController.cancelBooking);
router.get('/booking/last_id', apiController.getLastIdBooking);
router.get('/client/last_id', apiController.getLastIdClient);
router.post('/client/new', uploadCloud.single('img_path'),apiController.newClient);
router.delete('/booking/delete', apiController.deleteBooking);
router.put('/booking/update', apiController.updateBooking);
// router.update('/booking/cancel', apiController.cancelBooking);
router.get('/client', apiController.getListClient);
router.get('/booking', apiController.getListBooking);
router.post('/booking/new', apiController.insertBooking);
router.get('/area', apiController.getListArea);
router.get('/table',apiController.getListTable)
router.post('/authentication', apiController.authentication);
router.get('/logout', apiController.logout);
router.get('/cashier', apiController.verifyAccount,  apiController.cashier);
router.get('/reception',apiController.verifyAccount,  apiController.reception);
module.exports = router;