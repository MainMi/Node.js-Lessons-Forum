const router = require('express').Router();

const apiController = require('../controller/apiController')

router.get('/', apiController.defaultRenderPage);

const studentRouter = require('./studentRouter');

router.use('/students', studentRouter);

module.exports = router;
