const ApiError = require('../error/ErrorHandler');
const { validateWith } = require('../helpers');
const { topicService } = require('../service');

const {
    TOPIC_IS_NOT_EXIST,
    TOPIC_WAS_DELETED,
    ACCESS_DENIED,
    TOPIC_UNCHANGED
} = require('../error/errorMsg');

const { createTopicValidator, getTopicValidator } = require('../validator');

module.exports = {
    isTopicDataValid: validateWith(createTopicValidator),

    isTopicParamsValid: validateWith(getTopicValidator, 'params'),

    getTopicInfo: async (req, res, next) => {
        try {
            const { topicId } = req.params;
            const topic = await topicService.getTopic(topicId);
            if (!topic) {
                throw new ApiError(...Object.values(TOPIC_IS_NOT_EXIST));
            }

            if (topic.deletedByUser && !req.authUser?.user?.isAdmin) {
                throw new ApiError(...Object.values(TOPIC_WAS_DELETED));
            }

            req.topic = topic;

            next();
        } catch (e) {
            next(e);
        }
    },

    isTopicOwner: (req, res, next) => {
        try {
            const { user } = req.authUser;

            if (req.topic.userId !== user.userId) {
                throw new ApiError(...Object.values(ACCESS_DENIED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isTopicOwnerOrAdmin: (req, res, next) => {
        try {
            const { user } = req.authUser;



            if (req.topic.userId !== user.userId && !user.isAdmin) {
                throw new ApiError(...Object.values(ACCESS_DENIED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isTopicNotDeleted: (req, res, next) => {
        try {
            const { deletedByUser } = req.topic;

            if (deletedByUser) {
                throw new ApiError(...Object.values(TOPIC_WAS_DELETED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isTopicDataChanged: (req, res, next) => {
        try {
            const { topic, body } = req;

            if (topic.title === body.title && topic.text === body.text) {
                throw new ApiError(...Object.values(TOPIC_UNCHANGED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
