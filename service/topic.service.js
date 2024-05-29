const { Topic, User } = require('../models');
const { Op } = require('sequelize');


module.exports = {
    createTopic: async (userId, title, text) => {
        try {
            const createdTopic = await Topic.create({
                userId,
                title,
                text
            });

            const populatedTopic = await createdTopic.reload({
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

            return populatedTopic;
        } catch (error) {
            throw new Error('Error creating topic: ' + error.message);
        }
    },

    getTopic: async (topicId) => {
        try {
            const topic = await Topic.findOne({
                where: { topicId },
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

            return topic;
        } catch (error) {
            throw new Error('Error getting topic: ' + error.message);
        }
    },

    getTopicsPaginated: async (filterQuery) => {
        try {
            const {
                currentPage = 1,
                pageSize = 5,
                skipDeleted = true,
                text = '',
                userId = null
            } = filterQuery;

            const offset = (currentPage - 1) * pageSize;

            const whereClause = {
                ...skipDeleted && { deletedByUserId: null },
                ...text && { title: { [Op.like]: `%${text}%` } },
                ...userId && { userId }
            };

            const totalCount = await Topic.count({ where: whereClause });
            const totalPages = Math.ceil(totalCount / pageSize);

            const topics = await Topic.findAll({
                where: whereClause,
                order: [['updatedAt', 'DESC']],
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
                topics,
                count: totalCount,
                totalPages,
                currentPage
            };
        } catch (error) {
            throw new Error('Error getting paginated topics: ' + error.message);
        }
    },

    deleteTopic: async (topicId, deletedByUserId) => {
        try {
            await Topic.update({
                deletedByUserId
            }, {
                where: { topicId }
            });

            return true;
        } catch (error) {
            throw new Error('Error deleting topic: ' + error.message);
        }
    },

    editTopic: async (topicId, editedByUserId, newTitle, newText) => {
        try {
            await Topic.update({
                title: newTitle,
                text: newText,
                editedByUserId
            }, {
                where: { topicId }
            });

            return true;
        } catch (error) {
            throw new Error('Error editing topic: ' + error.message);
        }
    }
};
