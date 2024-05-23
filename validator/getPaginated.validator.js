const Joi = require('joi');

const GetPaginated = Joi.object({
    page: Joi.number()
        .integer()
        .positive()
        .default(1),
    pageSize: Joi.number()
        .integer()
        .min(5)
        .max(100)
        .default(20),
    skipDeleted: Joi.boolean().default(true)
}).required();

module.exports = GetPaginated;
