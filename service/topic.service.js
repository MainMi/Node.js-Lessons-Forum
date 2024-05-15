const { dbRequest, dbInsertRequest } = require('../helpers');

module.exports = {
    createTopic: (userId, title, text) => dbInsertRequest(
        'INSERT INTO topics (userId, title, text) VALUES (?, ?, ?)',
        [userId, title, text]
    ).then((topicId) => ({
        topicId,
        userId,
        title,
        text
    })),

    getTopic: (topicId) => dbRequest('SELECT * FROM topics WHERE topicId = ?', [topicId]),

    deleteTopic: (topicId, deletedByUser) => dbRequest(
        'UPDATE topics SET deletedByUser = ?, deletedTimestamp = CURRENT_TIMESTAMP WHERE topicId = ?',
        [deletedByUser, topicId]
    ),

    editTopic: (topicId, editedByUser, newTitle, newText) => dbRequest(
        'UPDATE topics SET title = ?, text = ?, editedByUser = ?, lastEditTimestamp = CURRENT_TIMESTAMP WHERE topicId = ?',
        [newTitle, newText, editedByUser, topicId]
    )
}
