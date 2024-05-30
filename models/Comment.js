const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Comment = sequelize.define('Comment', {
    topicId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    editedByUserId: DataTypes.INTEGER,
    deletedByUserId: DataTypes.INTEGER
}, {
    primaryKeyConstraint: true
});

module.exports = Comment;
