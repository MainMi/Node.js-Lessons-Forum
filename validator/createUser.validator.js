const Joi = require('joi');
const { regexEnum } = require('../constants');

const UserSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(20)
        .required(),
    email: Joi.string()
        .regex(regexEnum.REGEX_EMAIL)
        .required()
        .trim()
        .lowercase(),
    password: Joi.string().regex(regexEnum.REGEX_PASSWORD).required()
}).required();

module.exports = UserSchema;
