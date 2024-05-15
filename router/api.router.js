const router = require('express').Router();
const {
    authRouter,
    userRouter,
    topicRouter,
    commentRouter
} = require('./api');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/topics', topicRouter);
router.use('/comments', commentRouter);

module.exports = router;
