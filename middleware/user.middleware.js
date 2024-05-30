const ApiError = require('../error/ErrorHandler');

const { createUserValidator, changePasswordValidator } = require('../validator');
const { userService, authService } = require('../service');
const {
    USER_OR_EMAIL_IS_CREATED,
    PARAMS_IS_NOT_FOUND,
    ACCESS_DENIED,
    WRONG_USERNAME_OR_PASSWORD
} = require('../error/errorMsg');

const { validateWith } = require('../helpers');

const isUserAdmin = (req) => !!req?.authUser?.user?.isAdmin;

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

    isAdmin: (req, res, next) => {
        try {
            if (!isUserAdmin(req)) {
                throw new ApiError(...Object.values(ACCESS_DENIED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIfAdminDynamically: (param1, param2) => (req, res, next) => {
        try {
            if (!req[param1][param2] && !isUserAdmin(req)) {
                throw new ApiError(...Object.values(ACCESS_DENIED));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isChangePasswordParamsValid: validateWith(changePasswordValidator),

    isPasswordValid: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { user } = req.authUser;

            await authService.comparePassword(password, user.hashedPassword, false);

            next();
        } catch (e) {
            next(e);
        }
    },
};
