const { topicService } = require("../service");

module.exports = {
    createTopic: async (req, res) => {
        const { authUser: { userId }, body: { title, text } } = req;

        topic = await topicService.createTopic(userId, title, text);

        res.json(topic);
    },

    getTopic: (req, res) => {
        res.json(req.topic);
    },

    deleteTopic: async (req, res) => {
        const { user } = req.authUser;
        const { topicId } = req.topic;

        await topicService.deleteTopic(topicId, user.userId);

        res.json('Topic deleted successfully');
    },

    editTopic: async (req, res) => {
        const { title, text } = req.body;
        const { user } = req.authUser;
        const { topicId } = req.topic;

        await topicService.editTopic(topicId, user.userId, title, text);

        res.json('Topic edited successfully');
    },

    getTopicsPaginated: async (req, res) => {
        const { page, pageSize, skipDeleted } = req.query;

        const topics = await topicService.getTopicsPaginated(page, pageSize, skipDeleted);

        res.json(topics);
    }
};
