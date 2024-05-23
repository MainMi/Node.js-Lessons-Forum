const sequelize = require('sequelize');
const { User } = require('../models');

module.exports = {
    createUser: async (username, email, hashedPassword, isAdmin = false) => {
        try {
            const createdUser = await User.create({
                username,
                email,
                hashedPassword,
                isAdmin
            });

            return createdUser;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },

    getUser: async (userId) => {
        try {
            const user = await User.findOne({
                where: { userId }
            });

            return user;
        } catch (error) {
            throw new Error('Error getting user: ' + error.message);
        }
    },

    findUserByUsername: async (username) => {
        try {
            const user = await User.findOne({
                where: { username }
            });

            return user;
        } catch (error) {
            throw new Error('Error finding user by username: ' + error.message);
        }
    },

    isUserExists: async (username, email) => {
        try {
            const user = await User.findOne({
                where: {
                    [sequelize.Op.or]: [
                        { username },
                        { email }
                    ]
                }
            });

            return !!user;
        } catch (error) {
            throw new Error('Error checking if user exists: ' + error.message);
        }
    }
};
