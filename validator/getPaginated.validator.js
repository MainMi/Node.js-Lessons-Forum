const Joi = require('joi');

const GetPaginated = Joi.object({
    currentPage: Joi.number()
        .integer()
        .positive()
        .default(1),
    pageSize: Joi.number()
        .integer()
        .min(5)
        .max(100)
        .default(5),
    skipDeleted: Joi.boolean().default(true),
    text: Joi.string().max(200).min(0)
}).required();

module.exports = GetPaginated;
