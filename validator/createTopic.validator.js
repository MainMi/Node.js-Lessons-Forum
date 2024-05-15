const Joi = require('joi');

const topicSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(255)
        .required(),
    text: Joi.string()
        .min(3)
        .max(50000)
        .required()
}).required();

module.exports = topicSchema;
