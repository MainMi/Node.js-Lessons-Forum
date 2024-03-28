const express = require('express');
const router = express.Router();

const studentsInfo = require('../constants/studentsInfo.js');

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', message: 'Welcome to our website' });
});

router.get('/students', (req, res) => {
    res.render('students', {studentsInfo});
});

router.get('/student/:studentSurname', (req, res) => {
    const studentSurname = req.params.studentSurname;
    const studentInfo = studentsInfo[studentSurname];

    if (studentInfo?.fullname) {
        res.render('student', { studentInfo });
    } else {
        res.render('404');
    }
});

module.exports = router;
