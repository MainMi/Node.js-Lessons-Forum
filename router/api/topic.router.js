const router = require('express').Router();

const { topicController } = require('../../controller');
const { authMiddleware, topicMiddleware } = require('../../middleware');

router.post('/create',
    authMiddleware.checkAccessToken,
    topicMiddleware.isTopicDataValid,
    topicController.createTopic
);

router.delete('/:topicId',
    authMiddleware.checkAccessToken,
    topicMiddleware.isTopicParamsValid,
    topicMiddleware.getTopicInfo,
    topicMiddleware.isTopicNotDeleted,
    topicMiddleware.isTopicOwnerOrAdmin,
    topicController.deleteTopic
);

router.put('/:topicId',
    authMiddleware.checkAccessToken,
    topicMiddleware.isTopicParamsValid,
    topicMiddleware.getTopicInfo,
    topicMiddleware.isTopicNotDeleted,
    topicMiddleware.isTopicOwnerOrAdmin,
    topicMiddleware.isTopicDataValid,
    topicMiddleware.isTopicDataChanged,
    topicController.editTopic
);

router.get('/:topicId',
    authMiddleware.authIfTokenProvided,
    topicMiddleware.isTopicParamsValid,
    topicMiddleware.getTopicInfo,
    topicController.getTopic
);

module.exports = router;
