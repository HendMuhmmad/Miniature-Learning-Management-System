const express = require('express');
var multer = require('multer');
var upload = multer();
const courseController = require('../Controllers/courseController');

const router = express.Router();
router.use(upload.array());
router.get('/web/courses/create', courseController.course_create_get);
router.get('/api/courses', courseController.course_read);
router.post('/api/courses', courseController.course_create_post);
router.get('/api/courses/:id', courseController.course_read_id);
router.delete('/api/courses/:id', courseController.course_delete);
router.put('/api/courses/:id',courseController.course_update)
module.exports = router;