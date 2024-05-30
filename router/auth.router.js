const router = require('express').Router();

const { authController, userController } = require('../controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.use(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authController.getNewTokenPair
);

router.post(
    '/login',
    authMiddleware.isLoginDataValid,
    userMiddleware.getUserByUsername,
    authController.login
);

router.post(
    '/logout/all',
    authMiddleware.checkAccessToken,
    authController.logoutAll
);

router.post(
    '/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);

router.use(
    '/me',
    authMiddleware.checkAccessToken,
    userController.getUserInfo
);

module.exports = router;
