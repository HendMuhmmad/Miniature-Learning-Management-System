const express = require('express');
const studentController = require('../Controllers/studentController');

const router = express.Router();
router.get('/web/students/create', studentController.student_create_get);
router.get('/api/students', studentController.student_read);
router.post('/api/students', studentController.student_create_post);
router.get('/api/students/:id', studentController.student_read_id);
router.delete('/api/students/:id', studentController.student_delete);
router.put('/api/students/:id',studentController.student_update)
module.exports = router;