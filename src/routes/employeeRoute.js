const express = require('express');
const router = express.Router();
const employeeController = require('../app/controllers/EmployeeController');


router.get('/receptionist', employeeController.receptionistView);
router.get('/cashier', employeeController.cashierView);
module.exports = router;