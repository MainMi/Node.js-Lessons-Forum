const sequelize = require('sequelize');
const { Op } = sequelize;

const { Comment, User } = require('../models');

module.exports = {
    addComment: async (userId, topicId, text) => {
        try {
            const { dataValues: { maxCommentId }} = await Comment.findOne({
                attributes: [
                    [sequelize.fn('COALESCE', sequelize.fn('MAX', sequelize.col('commentId')), 0), 'maxCommentId']
                ],
                where: { topicId }
            });

            const nextCommentId = maxCommentId + 1;

            const comment = await Comment.create({
                userId,
                topicId,
                commentId: nextCommentId,
                text
            });

            const populatedComment = await comment.reload({
                include: [{
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'createdByUser'
                }, {
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'editedByUser',
                    required: false
                }, {
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'deletedByUser',
                    required: false
                }],
                attributes: {
                    exclude: ['userId', 'editedByUserId', 'deletedByUserId']
                }
            });

            return populatedComment;
        } catch (error) {
            throw new Error('Error adding comment: ' + error.message);
        }
    },

    getComment: async (topicId, commentId) => {
        try {
            const comment = await Comment.findOne({
                where: { topicId, commentId },
                include: [{
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'createdByUser'
                }, {
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'editedByUser',
                    required: false
                }, {
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'deletedByUser',
                    required: false
                }],
                attributes: {
                    exclude: ['userId', 'editedByUserId', 'deletedByUserId']
                }
            });

            return comment;
        } catch (error) {
            throw new Error('Error getting comment: ' + error.message);
        }
    },

    getCommentsPaginated: async (topicId, currentPage, pageSize, userId, text, skipDeleted = true) => {
        try {
            const offset = (currentPage - 1) * pageSize;

            const whereClause = {
                ...skipDeleted && { deletedByUserId: null },
                ...text && { text: { [Op.like]: `%${text}%` } },
                ...userId && { userId }
            };

            const totalCount = await Comment.count({ where: { topicId, ...whereClause } });

            const totalPages = Math.ceil(totalCount / pageSize);

            const comments = await Comment.findAll({
                where: { topicId, ...whereClause },
                limit: pageSize,
                offset: offset,
                include: [{
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'createdByUser'
                }, {
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'editedByUser',
                    required: false
                }, {
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'deletedByUser',
                    required: false
                }],
                attributes: {
                    exclude: ['userId', 'editedByUserId', 'deletedByUserId']
                }
            });

            return {
                comments,
                count: totalCount,
                totalPages,
                currentPage
            };
        } catch (error) {
            throw new Error('Error getting paginated comments: ' + error.message);
        }
    },

    getAllComments: async (topicId, userId, text, skipDeleted = true) => {
        try {
            const whereClause = {
                ...skipDeleted && { deletedByUserId: null },
                ...text && { text: { [Op.like]: `%${text}%` } },
                ...userId && { userId }
            };

            const comments = await Comment.findAll({
                where: { topicId, ...whereClause },
                include: [{
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'createdByUser'
                }, {
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'editedByUser',
                    required: false
                }, {
                    model: User,
                    attributes: ['userId', 'username', 'isAdmin'],
                    as: 'deletedByUser',
                    required: false
                }],
                attributes: {
                    exclude: ['userId', 'editedByUserId', 'deletedByUserId']
                }
            });

            return { comments };
        } catch (error) {
            throw new Error('Error getting all comments: ' + error.message);
        }
    },

    deleteComment: async (topicId, commentId, deletedByUserId) => {
        try {
            await Comment.update({
                deletedByUserId
            }, {
                where: { topicId, commentId }
            });

            return true;
        } catch (error) {
            throw new Error('Error deleting comment: ' + error.message);
        }
    },

    editComment: async (topicId, commentId, editedByUserId, newText) => {
        try {
            await Comment.update({
                text: newText,
                editedByUserId
            }, {
                where: { topicId, commentId }
            });

            return true;
        } catch (error) {
            throw new Error('Error editing comment: ' + error.message);
        }
    }
};
