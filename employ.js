const Sequelize = require('sequelize');
const sequelize = require('./database');

const Employ = sequelize.define('employ', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },

    hireDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    
    position: {
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = Employ

