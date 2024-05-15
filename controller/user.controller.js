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
        res.json(req.authUser.user);
    }
};
