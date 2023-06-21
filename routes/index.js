const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const reportController = require("../controllers/reportController");

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/student', require('./student'));
router.use('/interview', require('./interview'));
router.get("/download", reportController.downloadcsvReport);

module.exports = router;