const Joi = require('joi');
const { regexEnum } = require('../constants');

const UserSchema = Joi.object({
    password: Joi.string()
        .regex(regexEnum.REGEX_PASSWORD)
        .required(),
    newPassword: Joi.string()
        .regex(regexEnum.REGEX_PASSWORD)
        .required()
        .not(Joi.ref('password'))
        .messages({
            'any.invalid': 'New password must not be the same as the current password'
        })
}).required();

module.exports = UserSchema;
