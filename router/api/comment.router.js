const router = require('express').Router();

const { commentController } = require('../../controller');
const { authMiddleware, topicMiddleware, commentMiddleware } = require('../../middleware');

router.post('/:topicId/add',
    authMiddleware.checkAccessToken,
    topicMiddleware.isTopicParamsValid,
    topicMiddleware.getTopicInfo,
    topicMiddleware.isTopicNotDeleted,
    commentMiddleware.isCommentDataValid,
    commentController.addComment
);

router.get('/:topicId/:commentId',
    authMiddleware.authIfTokenProvided,
    commentMiddleware.isCommentParamsValid,
    topicMiddleware.getTopicInfo,
    topicMiddleware.isTopicNotDeleted,
    commentMiddleware.getCommentInfo,
    commentController.getComment
);

router.put('/:topicId/:commentId',
    authMiddleware.checkAccessToken,
    commentMiddleware.isCommentParamsValid,
    topicMiddleware.getTopicInfo,
    topicMiddleware.isTopicNotDeleted,
    commentMiddleware.getCommentInfo,
    commentMiddleware.isCommentNotDeleted,
    commentMiddleware.isCommentOwnerOrAdmin,
    commentMiddleware.isCommentDataValid,
    commentMiddleware.isCommentDataChanged,
    commentController.editComment
);

router.delete('/:topicId/:commentId',
    authMiddleware.checkAccessToken,
    commentMiddleware.isCommentParamsValid,
    topicMiddleware.getTopicInfo,
    topicMiddleware.isTopicNotDeleted,
    commentMiddleware.getCommentInfo,
    commentMiddleware.isCommentNotDeleted,
    commentMiddleware.isCommentOwnerOrAdmin,
    commentController.deleteComment
);

module.exports = router;
