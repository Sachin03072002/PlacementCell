const express = require('express');
const router = express.Router();

const StudentController = require('../controllers/studentController');




router.get('/Add-Student', StudentController.AddStudent);
router.get('/studentProfile/:id', StudentController.studentProfile);
router.post('/addNewStudentForm', StudentController.AddNewStudentForm);
router.post('/update/:id', StudentController.update);
router.get('/edit-student/:id', StudentController.editStudent);
router.get('/destroy/:studentId', StudentController.destroy);

module.exports = router;