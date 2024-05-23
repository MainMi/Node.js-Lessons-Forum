const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ErrorHandler');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/config');
const { WRONG_USERNAME_OR_PASSWORD, NOT_VALID_TOKEN } = require('../error/errorMsg');
const { ACCESS } = require('../constants/tokenType.enum');

const { OAuth } = require('../models');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePassword: async (password, hashPassword) => {
        const isPasswordEqual = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEqual) {
            throw new ApiError(...Object.values(WRONG_USERNAME_OR_PASSWORD));
        }
    },

    generateTokenPair: (encodeData) => {
        const accessToken = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        return { accessToken, refreshToken };
    },

    createOauth: async (userId, tokenPair) => {
        return await OAuth.create({
            userId: userId,
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken
        });
    },

    validateToken: (token, tokenType = ACCESS) => {
        const tokenTypeKey = (tokenType === ACCESS) ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;
        try {
            return jwt.verify(token, tokenTypeKey);
        } catch (e) {
            throw new ApiError(...Object.values(NOT_VALID_TOKEN));
        }
    },

    deleteTokensForUser: async (userId) => {
        await OAuth.destroy({ where: { userId: userId } });
    },

    deleteTokenPair: async (tokenPairId) => {
        await OAuth.destroy({ where: { tokenPairId: tokenPairId } });
    },

    findAccessToken: async (accessToken) => {
        return await OAuth.findOne({ where: { accessToken: accessToken } });
    },

    findRefreshToken: async (refreshToken) => {
        return await OAuth.findOne({ where: { refreshToken: refreshToken } });
    }
};
