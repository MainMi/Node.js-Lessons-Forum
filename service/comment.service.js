const sequelize = require('sequelize');
const { Comment } = require('../models');

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

            return comment;
        } catch (error) {
            throw new Error('Error adding comment: ' + error.message);
        }
    },

    getComment: async (topicId, commentId) => {
        try {
            const comment = await Comment.findOne({
                where: { topicId, commentId }
            });

            return comment;
        } catch (error) {
            throw new Error('Error getting comment: ' + error.message);
        }
    },

    getCommentsPaginated: async (topicId, currentPage, pageSize, skipDeleted = true) => {
        try {
            const offset = (currentPage - 1) * pageSize;
            const whereClause = skipDeleted ? { deletedByUser: null } : {};

            const totalCount = await Comment.count({ where: { topicId, ...whereClause } });
            const totalPages = Math.ceil(totalCount / pageSize);

            const comments = await Comment.findAll({
                where: { topicId, ...whereClause },
                limit: pageSize,
                offset: offset
            });

            const metadata = {
                totalCount,
                totalPages,
                pageSize,
                currentPage
            };

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

    deleteComment: async (topicId, commentId, deletedByUser) => {
        try {
            await Comment.update({
                deletedByUser
            }, {
                where: { topicId, commentId }
            });

            return true;
        } catch (error) {
            throw new Error('Error deleting comment: ' + error.message);
        }
    },

    editComment: async (topicId, commentId, editedByUser, newText) => {
        try {
            await Comment.update({
                text: newText,
                editedByUser
            }, {
                where: { topicId, commentId }
            });

            return true;
        } catch (error) {
            throw new Error('Error editing comment: ' + error.message);
        }
    }
};
