const Joi = require('joi');
const path = require('path');
const firebase = require('../db');
const Course = require('../models/courses');
const firestore = firebase.firestore();



function validateCourse(course) {
    const schema = {
        name: Joi.string().min(5).required(),
        code: Joi.string().length(6).regex(RegExp(/^[a-zA-Z]{3}\d{3}$/)).required(),
        description: Joi.string().max(200).optional().allow(null, '')
    };
    return Joi.validate(course, schema);
}

const course_read = async (req, res) => {
    const courses = await firestore.collection('courses');
    const data = await courses.get();
    const coursesArray = [];
    if (data.empty) {
        res.status(404).send('No course record found');
    } else {
        data.forEach(doc => {
            const course = new Course(
                doc.id,
                doc.data().name,
                doc.data().code,
                doc.data().description,
            );
            coursesArray.push(course);
        });
        res.send(coursesArray);
    }
}

const course_read_id = async (req, res) => {
    const id = req.params.id;
    const course = await firestore.collection('courses').doc(id);
    const doc = await course.get();
    if(!doc.exists) {
        res.status(404).send('Course not found');
    }else {
        res.send(doc.data());
    }
}

const course_create_get = (req, res) => {
    let reqPath = path.join(__dirname, '../website');
    res.sendFile('courseForm.html', { root: reqPath });

}

const course_create_post = async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    await firestore.collection('courses').doc().set(req.body);
    res.send('Course created successfully');

}

const course_delete = async (req, res) => {
    const id = req.params.id;
    await firestore.collection('courses').doc(id).delete();
    res.send('Course deleted successfully');

}

const course_update = async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const id = req.params.id;
    const data = req.body;
    const course =  await firestore.collection('courses').doc(id);
    await course.update(data);
    res.send('Course updated successfully'); 

}

module.exports = {
    course_read,
    course_read_id,
    course_create_get,
    course_create_post,
    course_delete,
    course_update
}