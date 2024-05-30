const { userService, authService } = require('../service');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;

            const hashedPassword = await authService.hashPassword(password);
            const user = await userService.createUser(username, email, hashedPassword);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    getUserInfo: (req, res) => {
        const { user } = req.authUser;

        user.hashedPassword = undefined;

        res.json(user);
    },

    changePassword: async (req, res) => {
        try {
            const { newPassword } = req.body;
            const { user: { userId } } = req.authUser;

            const hashedPassword = await authService.hashPassword(newPassword);

            await userService.changePassword(userId, hashedPassword);
            await authService.deleteTokensForUser(userId);

            res.json('Password changed');
        } catch (e) {
            next(e);
        }
    }
};
