const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Topic = sequelize.define('Topic', {
    topicId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    editedByUserId: DataTypes.INTEGER,
    deletedByUserId: DataTypes.INTEGER
});

module.exports = Topic;
