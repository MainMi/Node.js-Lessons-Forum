const router = require('express').Router();
const { studentRouter } = require('./frontend');
const { renderController } = require('../controller');

router.use('/students', studentRouter);

router.get('/', renderController.defaultRenderPage);

module.exports = router;
