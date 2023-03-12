const Sequelize = require('sequelize');
const sequelize = require('./database');
const Employ = require('./employ');

const Task = sequelize.define('task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description:{
        type: Sequelize.STRING,
        allowNull: true
    },

    dueDate: {
        type:Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
    },

});

Task.belongsTo(Employ,{
    foreignKey: 'employeeId',
    targetKey: 'id'
});

module.exports = Task