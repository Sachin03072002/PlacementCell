const express = require('express');

const router = express.Router();

const interviewController = require('../controllers/interviewController');

router.get('/addInterview', interviewController.addInterview);
router.post('/create', interviewController.create);
router.post('/enroll-in-interview/:id', interviewController.enrollInInterview);
router.get('/deallocate/:studentId/:interviewId', interviewController.deallocate);
router.get('/delete/:interviewId', interviewController.delete)

module.exports = router;