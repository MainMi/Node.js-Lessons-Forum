const { Topic } = require('../models');

module.exports = {
    createTopic: async (userId, title, text) => {
        try {
            const createdTopic = await Topic.create({
                userId,
                title,
                text
            });

            return createdTopic;
        } catch (error) {
            throw new Error('Error creating topic: ' + error.message);
        }
    },

    getTopic: async (topicId) => {
        try {
            const topic = await Topic.findOne({
                where: { topicId }
            });

            return topic;
        } catch (error) {
            throw new Error('Error getting topic: ' + error.message);
        }
    },

    getTopicsPaginated: async (page, pageSize, skipDeleted = true) => {
        try {
            const offset = (page - 1) * pageSize;
            const whereClause = skipDeleted ? { deletedByUser: null } : {};

            const totalCount = await Topic.count({ where: whereClause });
            const totalPages = Math.ceil(totalCount / pageSize);

            const topics = await Topic.findAll({
                where: whereClause,
                limit: pageSize,
                offset: offset
            });

            const metadata = {
                totalCount,
                totalPages,
                pageSize,
                currentPage: page
            };

            return { topics, metadata };
        } catch (error) {
            throw new Error('Error getting paginated topics: ' + error.message);
        }
    },

    deleteTopic: async (topicId, deletedByUser) => {
        try {
            await Topic.update({
                deletedByUser
            }, {
                where: { topicId }
            });

            return true;
        } catch (error) {
            throw new Error('Error deleting topic: ' + error.message);
        }
    },

    editTopic: async (topicId, editedByUser, newTitle, newText) => {
        try {
            await Topic.update({
                title: newTitle,
                text: newText,
                editedByUser
            }, {
                where: { topicId }
            });

            return true;
        } catch (error) {
            throw new Error('Error editing topic: ' + error.message);
        }
    }
};
