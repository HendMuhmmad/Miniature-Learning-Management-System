const Joi = require('joi');
const path = require('path');
const firebase = require('../db');
const Student = require('../models/students');
const firestore = firebase.firestore();

function validateStudent(student) {
    const schema = {
        name: Joi.string().regex(RegExp(/^[a-z ,.'-]+$/i)),
        code: Joi.string().length(7),
    };
    return Joi.validate(student, schema);
}

const student_read = async (req, res) => {
    const students = await firestore.collection('students');
    const data = await students.get();
    const studentsArray = [];
    if (data.empty) {
        res.status(404).send('No student record found');
    } else {
        data.forEach(doc => {
            const student = new Student(
                doc.id,
                doc.data().name,
                doc.data().code,
            );
            studentsArray.push(student);
        });
        res.send(studentsArray);
    }
}

const student_read_id = async (req, res) => {
    const id = req.params.id;
    const student = await firestore.collection('students').doc(id);
    const doc = await student.get();
    if(!doc.exists) {
        res.status(404).send('Student not found');
    }else {
        res.send(doc.data());
    }
}

const student_create_get = (req, res) => {
    let reqPath = path.join(__dirname, '../website');
    res.sendFile('studentForm.html', { root: reqPath });


}

const student_create_post = async (req, res) => {
    const { error } = validateStudent(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    await firestore.collection('students').doc().set(req.body);
    res.send('Student created successfully');
}

const student_delete = async (req, res) => {
    const id = req.params.id;
    await firestore.collection('students').doc(id).delete();
    res.send('Student deleted successfully');

}

const student_update = async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const id = req.params.id;
    const data = req.body;
    const student =  await firestore.collection('students').doc(id);
    await student.update(data);
    res.send('Student updated successfully');  
}

module.exports = {
    student_read,
    student_read_id,
    student_create_get,
    student_create_post,
    student_delete,
    student_update
}