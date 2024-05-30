module.exports = {
    authValidator: require('./auth.validator'),
    createUserValidator: require('./createUser.validator'),
    createTopicValidator: require('./createTopic.validator'),
    getTopicValidator: require('./getTopic.validator'),
    addCommentValidator: require('./addComment.validator'),
    getCommentValidator: require('./getComment.validator'),
    getPaginatedValidator: require('./getPaginated.validator'),
    getAllRecordsValidator: require('./getAllRecords.validator'),
    changePasswordValidator: require('./changePassword.validator')
};
