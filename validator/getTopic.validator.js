const Joi = require('joi');

const GetTopicSchema = Joi.object({
    topicId: Joi.number()
        .integer()
        .positive()
        .required()
}).required();

module.exports = GetTopicSchema;
