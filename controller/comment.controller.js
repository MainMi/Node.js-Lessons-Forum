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
};
