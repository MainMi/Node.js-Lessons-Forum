const Joi = require('joi');
const { regexEnum } = require('../constants');

const loginSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(20)
        .required(),
    password: Joi.string().regex(regexEnum.REGEX_PASSWORD).required()
}).required();

module.exports = loginSchema;
