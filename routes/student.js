const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/studentController');




router.get('/Add-Student', StudentController.AddStudent);
router.post('/addNewStudentForm', StudentController.AddNewStudentForm);


module.exports = router;