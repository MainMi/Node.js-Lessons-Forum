
const ApiError = require('../error/ErrorHandler');
const { PARAMS_IS_NOT_FOUND } = require('../error/errorMsg');

const validateWith = (validator, param='body') => (req, res, next) => {
    try {
        const { value, error } = validator.validate(req[param]);
        if (error) {
            const { status, errorStatus } = PARAMS_IS_NOT_FOUND;
            next(new ApiError(status, errorStatus, error.details[0].message));
            return;
        }

        req[param] = value;
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = validateWith;
