const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    hashedPassword: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = User;
