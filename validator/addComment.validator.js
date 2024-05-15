const Joi = require('joi');

const commentSchema = Joi.object({
    text: Joi.string()
        .min(3)
        .max(10000)
        .required()
}).required();

module.exports = commentSchema;
