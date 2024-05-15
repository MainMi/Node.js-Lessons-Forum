const ApiError = require('../error/ErrorHandler');

const {
    NOT_IS_PROVIDED_TOKEN,
    NOT_VALID_TOKEN
} = require('../error/errorMsg');

const { authService, userService } = require('../service');
const { authValidator } = require('../validator');
const { REFRESH } = require('../constants/tokenType.enum');
const { validateWith } = require('../helpers');

const authUser = (required = true) => async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token || !token.length) {
            if (required) {
                throw new ApiError(...Object.values(NOT_IS_PROVIDED_TOKEN));
            }

            next();
            return;
        }

        authService.validateToken(token);

        const tokenData = await authService.findAccessToken(token);

        if (!tokenData || !tokenData.userId) {
            throw new  ApiError(...Object.values(NOT_VALID_TOKEN));
        }

        tokenData.user = await userService.getUser(tokenData.userId);
        tokenData.user.hashedPassword = undefined;

        req.authUser = tokenData;

        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    isLoginDataValid: validateWith(authValidator),

    checkAccessToken: authUser(true),

    authIfTokenProvided: authUser(false),

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            if (!token) {
                throw new ApiError(...Object.values(NOT_IS_PROVIDED_TOKEN));
            }

            authService.validateToken(token, REFRESH);

            const tokenData = await authService.findRefreshToken(token);

            if (!tokenData || !tokenData.userId) {
                throw new ApiError(...Object.values(NOT_VALID_TOKEN));
            }

            const { tokenPairId, userId } = tokenData;

            authService.deleteTokenPair(tokenPairId);

            const tokenPair = authService.generateTokenPair({ userId });

            authService.createOauth(userId, tokenPair);

            req.tokenPair = tokenPair;

            next();
        } catch (e) {
            next(e);
        }
    }
};
