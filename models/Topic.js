const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Topic = sequelize.define('Topic', {
    topicId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    editedByUser: DataTypes.INTEGER,
    deletedByUser: DataTypes.INTEGER
});

module.exports = Topic;
