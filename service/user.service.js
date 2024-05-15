const { dbRequest, dbInsertRequest } = require('../helpers');

module.exports = {
    createUser: (username, email, hashedPassword, isAdmin=false) => dbInsertRequest(
        'INSERT INTO users (username, email, hashedPassword, isAdmin) VALUES (?, ?, ?, ?)',
        [username, email, hashedPassword, isAdmin]
    ).then((userId) => ({
        userId,
        username,
        email,
        hashedPassword,
        isAdmin
    })),

    getUser: (userId) => dbRequest('SELECT * FROM users WHERE userId = ?', [userId]),

    findUserByUsername: (username) => dbRequest('SELECT * FROM users WHERE username = ?', [username]),

    isUserExists: (username, email) => dbRequest('SELECT 1 FROM users WHERE username = ? OR email = ?', [username, email])
};
