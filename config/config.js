module.exports = {
    PORT: process.env.SERVER_PORT || 3001,
    SQLITE_DB: process.env.SQLITE_DB || './database.db',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh'
}
