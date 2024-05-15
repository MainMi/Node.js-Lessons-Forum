const { dbRequest, dbInsertRequest } = require('../helpers');

module.exports = {
    addComment: (userId, topicId, text) => dbRequest(
        'SELECT COALESCE(MAX(commentId), 0) + 1 as nextCommentId FROM comments WHERE topicId = ?',
        [topicId]
    ).then(({ nextCommentId }) => dbInsertRequest(
        'INSERT INTO comments (userId, topicId, commentId, text) VALUES (?, ?, ?, ?)',
        [userId, topicId, nextCommentId, text]
    ).then(() => ({
        topicId,
        commentId: nextCommentId,
        userId,
        text
    }))),

    getComment: (topicId, commentId) => dbRequest(
        'SELECT * FROM comments WHERE topicId = ? AND commentId = ?',
        [topicId, commentId]
    ),

    deleteComment: (topicId, commentId, deletedByUser) => dbRequest(
        'UPDATE comments SET deletedByUser = ?, deletedTimestamp = CURRENT_TIMESTAMP WHERE topicId = ? AND commentId = ?',
        [deletedByUser, topicId, commentId]
    ),

    editComment: (topicId, commentId, editedByUser, newText) => dbRequest(
        'UPDATE comments SET text = ?, editedByUser = ?, lastEditTimestamp = CURRENT_TIMESTAMP WHERE topicId = ? AND commentId = ?',
        [newText, editedByUser, topicId, commentId]
    )
};
