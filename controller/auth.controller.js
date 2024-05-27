const { authService } = require('../service');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await authService.comparePassword(password, user.hashedPassword);

            const tokenPair = authService.generateTokenPair({ userId: user.userId });
            authService.createOauth(user.userId, tokenPair);

            req.user = { user, tokenPair };

            user.hashedPassword = undefined;

            res.json({
                user,
                tokenPair,
            }).status(200);
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const { authUser } = req;

            await authService.deleteTokensForUser(authUser.userId);

            res.json('User is logout from all sessions');
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { authUser } = req;

            await authService.deleteTokenPair(authUser.tokenPairId);

            res.json('User is logout');
        } catch (e) {
            next(e);
        }
    },

    getNewTokenPair: (req, res, next) => {
        try {
            const { tokenPair } = req;
            res.json({ tokenPair });
        } catch (e) {
            next(e);
        }
    }
};
