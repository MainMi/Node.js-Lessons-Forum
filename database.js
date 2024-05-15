const schedule = require('node-schedule');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
    // Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            userId INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(20) UNIQUE NOT NULL,
            email VARCHAR(30) UNIQUE NOT NULL,
            hashedPassword TEXT NOT NULL,
            isAdmin BOOLEAN DEFAULT 0,
            registeredTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Topics table
    db.run(`
        CREATE TABLE IF NOT EXISTS topics (
            topicId INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            title VARCHAR(255) NOT NULL,
            text TEXT NOT NULL,
            editedByUser INTEGER,
            deletedByUser INTEGER,
            createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            lastEditTimestamp TIMESTAMP,
            deletedTimestamp TIMESTAMP,

            FOREIGN KEY (userId) REFERENCES users(userId),
            FOREIGN KEY (editedByUser) REFERENCES users(userId),
            FOREIGN KEY (deletedByUser) REFERENCES users(userId)
        )
    `);

    // Comments table
    db.run(`
        CREATE TABLE IF NOT EXISTS comments (
            topicId INTEGER NOT NULL,
            commentId INTEGER NOT NULL,
            userId INTEGER NOT NULL,
            text TEXT NOT NULL,
            editedByUser INTEGER,
            deletedByUser INTEGER,
            createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            lastEditTimestamp TIMESTAMP,
            deletedTimestamp TIMESTAMP,

            PRIMARY KEY (topicId, commentId),

            FOREIGN KEY (userId) REFERENCES users(userId),
            FOREIGN KEY (topicId) REFERENCES topics(topicId),
            FOREIGN KEY (editedByUser) REFERENCES users(userId),
            FOREIGN KEY (deletedByUser) REFERENCES users(userId)
        )
    `);

    // Indexing on topicId field
    db.run(`
        CREATE INDEX IF NOT EXISTS topicId_index ON comments (topicId)
    `);

    // OAuth table
    db.run(`
        CREATE TABLE IF NOT EXISTS oauth (
            tokenPairId INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            accessToken TEXT UNIQUE NOT NULL,
            refreshToken TEXT UNIQUE NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (userId) REFERENCES users(userId)
        )
    `);

    // Indexing on accessToken field
    db.run(`
        CREATE INDEX IF NOT EXISTS accessToken_index ON oauth (accessToken)
    `);

    // Indexing on refreshToken field
    db.run(`
        CREATE INDEX IF NOT EXISTS refreshToken_index ON oauth (refreshToken)
    `);
});

const deleteOldTokenPairs = (daysPeriod=30) => {
    db.run(`
        DELETE FROM oauth WHERE timestamp < DATETIME('now', '-' || ? || ' days')
    `, [daysPeriod]);
}

deleteOldTokenPairs();

schedule.scheduleJob('0 0 * * *', deleteOldTokenPairs);

module.exports = db;
