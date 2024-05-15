const Joi = require('joi');

const GetCommentSchema = Joi.object({
    topicId: Joi.number()
        .integer()
        .positive()
        .required(),
    commentId: Joi.number()
        .integer()
        .positive()
        .required()
}).required();

module.exports = GetCommentSchema;
