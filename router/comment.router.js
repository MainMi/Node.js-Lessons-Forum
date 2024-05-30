const router = require('express').Router();

const { commentController } = require('../controller');
const { authMiddleware, topicMiddleware, commentMiddleware, paginatorMiddleware } = require('../middleware');

router.post('/:topicId/add',
    authMiddleware.checkAccessToken,
    topicMiddleware.isTopicParamsValid,
    topicMiddleware.getTopicInfo,
    topicMiddleware.isTopicNotDeleted,
    commentMiddleware.isCommentDataValid,
    commentController.addComment
);

router.get('/:topicId/all',
    authMiddleware.authIfTokenProvided,
    topicMiddleware.isTopicParamsValid,
    paginatorMiddleware.isAllRecordsParamsValid,
    paginatorMiddleware.isAdminIfDeletedDataRequested,
    topicMiddleware.getTopicInfo,
    commentController.getAllComments
);

router.get('/:topicId/:commentId',
    authMiddleware.authIfTokenProvided,
    commentMiddleware.isCommentParamsValid,
    topicMiddleware.getTopicInfo,
    commentMiddleware.getCommentInfo,
    commentController.getComment
);

router.get('/:topicId',
    authMiddleware.authIfTokenProvided,
    topicMiddleware.isTopicParamsValid,
    paginatorMiddleware.isPaginatedParamsValid,
    paginatorMiddleware.isAdminIfDeletedDataRequested,
    topicMiddleware.getTopicInfo,
    commentController.getCommentsPaginated
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
