const Joi = require('joi');

const GetAllRecords = Joi.object({
    skipDeleted: Joi.boolean()
        .default(true),
    text: Joi.string()
        .min(0)
        .max(200),
    userId: Joi.number()
        .integer()
        .positive()
}).required();

module.exports = GetAllRecords;
