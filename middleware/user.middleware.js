const ApiError = require('../error/ErrorHandler');

const { createUserValidator } = require('../validator');
const { userService } = require('../service');
const {
    USER_OR_EMAIL_IS_CREATED,
    PARAMS_IS_NOT_FOUND,
    ACCESS_DENIED,
    NOT_MODIFY_YOURSELF,
    WRONG_USERNAME_OR_PASSWORD
} = require('../error/errorMsg');

module.exports = {
    isValidUser: (req, res, next) => {
        try {
            const { value, error } = createUserValidator.validate(req.body);
            if (error) {
                const { status, errorStatus } = PARAMS_IS_NOT_FOUND;
                next(new ApiError(status, errorStatus, error.details[0].message));
                return;
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExists: async (req, res, next) => {
        try {
            const { username, email } = req.body;

            const isUserExists = await userService.isUserExists(username, email);
            if (isUserExists) {
                next(new ApiError(...Object.values(USER_OR_EMAIL_IS_CREATED)));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByUsername: async (req, res, next) => {
        try {
            const { username } = req.body;

            const user = await userService.findUserByUsername(username);
            if (!user) {
                next(new ApiError(...Object.values(WRONG_USERNAME_OR_PASSWORD)));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isChangeYourself: (
        pathArr = [
            'body',
            'authUser'
        ],
        parameterArr = [
            'userId',
            'userId'
        ]
    ) => (req, res, next) => {
        try {
            const [ firstPath, secondPath ] = pathArr;
            const [ firstParameter, secondParameter ] = parameterArr;
            const firstParam = req[firstPath][firstParameter];
            const secondParam = req[secondPath][secondParameter];

            if (firstParam == secondParam) {
                throw new ApiError(...Object.values(NOT_MODIFY_YOURSELF));
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isAdmin: (req, res, next) => {
        try {
            const isAdmin = !!req.authUser.user.isAdmin;

            if (!isAdmin) {
                throw new ApiError(...Object.values(ACCESS_DENIED));
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
