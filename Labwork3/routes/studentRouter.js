const router = require('express').Router();
const studentController = require('../controller/studentController');

router.get('/', studentController.studentRender);

router.get('/:studentSurname', studentController.studentRenderByName);

module.exports = router;