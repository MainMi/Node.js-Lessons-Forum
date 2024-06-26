const { commentService } = require("../service");

module.exports = {
    addComment: async (req, res) => {
        const { authUser: { userId }, body: { text }, topic: { topicId } } = req;

        comment = await commentService.addComment(userId, topicId, text);

        res.json(comment);
    },

    getComment: async (req, res) => {
        res.json(req.comment);
    },

    deleteComment: async (req, res) => {
        const { user: { userId } } = req.authUser;
        const { topicId, commentId } = req.comment;

        await commentService.deleteComment(topicId, commentId, userId);

        res.json('Comment deleted successfully');
    },

    editComment: async (req, res) => {
        const { user: { userId } } = req.authUser;
        const { topicId, commentId } = req.comment;
        const { text } = req.body;

        await commentService.editComment(topicId, commentId, userId, text);

        res.json('Comment edited successfully');
    },

    getCommentsPaginated: async (req, res) => {
        const topic = req.topic;
        const { topicId } = topic;
        const { currentPage, pageSize, userId, text, skipDeleted } = req.query;

        const comments = await commentService.getCommentsPaginated(topicId, currentPage, pageSize, userId, text, skipDeleted);

        res.json({ topic, ...comments });
    },

    getAllComments: async (req, res) => {
        const topic = req.topic;
        const { topicId } = topic;
        const { userId, text, skipDeleted } = req.query;

        const comments = await commentService.getAllComments(topicId, userId, text, skipDeleted);

        res.json({ topic, ...comments });
    }
};
