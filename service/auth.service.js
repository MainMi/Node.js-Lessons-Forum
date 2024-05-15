const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../error/ErrorHandler');

const { dbRequest } = require('../helpers');

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
} = require('../config/config');

const { ACCESS } = require('../constants/tokenType.enum');

const {
    WRONG_USERNAME_OR_PASSWORD,
    NOT_VALID_TOKEN
} = require('../error/errorMsg');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePassword: async (password, hashPassword) => {
        const isPasswordEquels = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquels) {
            throw new ApiError(...Object.values(WRONG_USERNAME_OR_PASSWORD));
        }
    },

    generateTokenPair: (encodeData) => {
        const accessToken = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    },

    createOauth: (userId, tokenPair) => dbRequest(
        'INSERT INTO oauth (userId, accessToken, refreshToken) VALUES (?, ?, ?)',
        [userId, tokenPair.accessToken, tokenPair.refreshToken]
    ),

    validateToken: (token, tokenType = ACCESS) => {
        const tokenTypeKey = (tokenType === ACCESS)
            ? ACCESS_TOKEN_SECRET
            : REFRESH_TOKEN_SECRET;
        try {
            return jwt.verify(token, tokenTypeKey);
        } catch (e) {
            throw new ApiError(...Object.values(NOT_VALID_TOKEN));
        }
    },

    deleteTokensForUser: (userId) => dbRequest('DELETE FROM oauth WHERE userId = ?', [userId]),

    deleteTokenPair: (tokenPairId) => dbRequest('DELETE FROM oauth WHERE tokenPairId = ?', [tokenPairId]),

    findAccessToken: (accessToken) => dbRequest('SELECT * FROM oauth WHERE accessToken = ?', [accessToken]),

    findRefreshToken: (refreshToken) => dbRequest('SELECT * FROM oauth WHERE refreshToken = ?', [refreshToken])
};
