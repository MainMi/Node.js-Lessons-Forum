const ApiError = require('../error/ErrorHandler');
const { COMMENT_IS_NOT_EXIST, COMMENT_WAS_DELETED, ACCESS_DENIED, COMMENT_UNCHANGED } = require('../error/errorMsg');

const { validateWith } = require('../helpers');
const { commentService } = require('../service');
const { addCommentValidator, getCommentValidator } = require('../validator');


module.exports = {
    isCommentDataValid: validateWith(addCommentValidator),

    isCommentParamsValid: validateWith(getCommentValidator, 'params'),

    getCommentInfo: async (req, res, next) => {
        try {
            const { topicId, commentId } = req.params;
            const comment = await commentService.getComment(topicId, commentId);

            if (!comment) {
                throw new ApiError(...Object.values(COMMENT_IS_NOT_EXIST));
            }

            if (comment.deletedByUser && !req.authUser?.user?.isAdmin) {
                throw new ApiError(...Object.values(COMMENT_WAS_DELETED));
            }

            req.comment = comment;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCommentOwner: (req, res, next) => {
        try {
            const { user } = req.authUser;

            if (req.comment.userId !== user.userId) {
                throw new ApiError(...Object.values(ACCESS_DENIED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCommentOwnerOrAdmin: (req, res, next) => {
        try {
            const { user } = req.authUser;

            if (req.comment.userId !== user.userId && !user.isAdmin) {
                throw new ApiError(...Object.values(ACCESS_DENIED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCommentNotDeleted: (req, res, next) => {
        try {
            const { deletedByUser } = req.comment;

            if (deletedByUser) {
                throw new ApiError(...Object.values(COMMENT_WAS_DELETED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCommentDataChanged: (req, res, next) => {
        try {
            const { comment, body } = req;

            if (comment.text === body.text) {
                throw new ApiError(...Object.values(COMMENT_UNCHANGED));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
