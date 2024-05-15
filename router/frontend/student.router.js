const router = require('express').Router();
const studentController = require('../../controller/student.controller');

router.get('/', studentController.studentRender);

router.get('/sync/:studentSurname', studentController.studentRenderByNameSync);
router.get('/callback/:studentSurname', studentController.studentRenderByNameCallback);
router.get('/promise/:studentSurname', studentController.studentRenderByNamePromise);
router.get('/async/:studentSurname', studentController.studentRenderByNameAsync);

router.get('/:studentSurname', studentController.studentRenderByName);

module.exports = router;
