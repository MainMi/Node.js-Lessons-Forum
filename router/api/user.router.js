const router = require('express').Router();

const { userController, authController } = require('../../controller');
const { userMiddleware, authMiddleware } = require('../../middleware');

router.post('/create',
    userMiddleware.isValidUser,
    userMiddleware.isUserExists,
    userController.createUser,
    authController.login
);

router.use(authMiddleware.checkAccessToken);


module.exports = router;
