const express = require('express');

const router = express.Router();
// const homeController = require('../controllers/home_controller');

console.log('router loaded');


router.get('/');
router.use('/users', require('./users'));



module.exports = router;