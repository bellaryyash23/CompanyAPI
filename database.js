const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'company',
    'admin',
    '12345',
    {
        dialect: 'sqlite',
        host: './company.db',
        define: {
            timestamps: false
        },
    }
);

module.exports = sequelize