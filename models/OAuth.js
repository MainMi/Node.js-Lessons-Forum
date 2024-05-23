const { Sequelize, DataTypes } = require('sequelize');
const schedule = require('node-schedule');
const sequelize = require('../database');

const OAuth = sequelize.define('OAuth', {
    tokenPairId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accessToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    }
});

const deleteOldTokenPairs = async (daysPeriod = 30) => {
    await OAuth.destroy({
        where: {
            createdAt: {
                [Sequelize.Op.lt]: Sequelize.literal(`datetime('now', '-' || ${daysPeriod} || ' days')`)
            }
        }
    });
};

schedule.scheduleJob('0 0 * * *', deleteOldTokenPairs);

module.exports = OAuth;
