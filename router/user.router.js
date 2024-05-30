const router = require('express').Router();

const { userController, authController } = require('../controller');
const { userMiddleware, authMiddleware } = require('../middleware');

router.post('/create',
    userMiddleware.isValidUser,
    userMiddleware.isUserExists,
    userController.createUser,
    authController.login
);

router.post('/change-password',
    authMiddleware.checkAccessToken,
    userMiddleware.isChangePasswordParamsValid,
    userMiddleware.isPasswordValid,
    userController.changePassword
);

module.exports = router;
